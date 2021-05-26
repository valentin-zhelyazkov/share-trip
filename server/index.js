const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const TripModel = require('./models/Trip');
const UserModel = require('./models/User');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userValidator, validateUser } = require('./controller/registerValidation');
const { tripValidator, validateTrip } = require('./controller/tripValidation');
const { loginValidator, validateLogin } = require('./controller/loginValidation');

app.use(express.json());
app.use(cors());



mongoose.connect('mongodb://localhost/Trips2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.get('/', async (req, res) => {
    await TripModel.find({}, (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    })
});

app.post('/register', userValidator, validateUser , async (req, res) => {
    
    const { username, password, name, age, phoneNumber } = req.body;

    try {
        await bcrypt.hash(password, 10).then((hash) => {
            const user = new UserModel({
                username: username,
                password: hash,
                name: name,
                age: age,
                phoneNumber: phoneNumber
            })

            user.save();
            res.send('success');
        })
    } catch (err) {
        console.log(err);
    }
})

app.post('/login',loginValidator, validateLogin, async (req, res) => {

    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        res.send({ error: 'User not found' });
    }

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
            res.send({ error: 'Wrong username or password' });
        }
        const accessToken = sign({ username: user.username, id: user._id }, "importandSecret");
        res.send(accessToken);
    })
});

app.get('/user-profile/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await UserModel.findById(userId);
        res.send(user);
    } catch (err) { console.log(err) }

});

app.get('/edit/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const curTrip = await TripModel.findById(id);
        res.send(curTrip);
    } catch (err) { console.log(err) }

})

app.put('/update', async (req, res) => {
    const id = req.body.id;

    const newFromCity = req.body.fromCity;
    const newToCity = req.body.toCity;
    const newOpenSeats = req.body.openSeats;
    const newAbout = req.body.about;

    try {
        await TripModel.findByIdAndUpdate(id, {
            fromCity: newFromCity,
            toCity: newToCity,
            openSeats: newOpenSeats,
            about: newAbout
        })

        res.send('updated');
    } catch (err) { console.log(err) }

});

app.get('/trip-details/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const trip = await TripModel.findById(id);
        const userInfo = await UserModel.findById(trip.creator);
        const allAbout = {
            about: trip.about,
            name: userInfo.name,
            age: userInfo.age,
            phoneNumber: userInfo.phoneNumber,
            creator: trip.creator
        }

        res.send(allAbout);
    } catch (err) { console.log(err) }

})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await TripModel.findByIdAndDelete(id).exec();
        res.send('deleted');
    } catch (err) { console.log(err) }

})

app.delete('/delete-user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        await UserModel.findByIdAndDelete(userId).exec();
        res.send('User is deleted successfully');
    } catch (err) { console.log(err) }
})

app.post('/insert',tripValidator, validateTrip, async (req, res) => {

    const fromCity = req.body.fromCity;
    const toCity = req.body.toCity;
    const openSeats = req.body.openSeats;
    const about = req.body.about;
    const creator = req.body.creator;

    const trip = new TripModel({
        fromCity: fromCity,
        toCity: toCity,
        openSeats: openSeats,
        about: about,
        creator: creator
    });

    try {
        await trip.save();
        res.send('Inserted data');
    } catch (error) {
        console.log(error);
    }
})

app.put('/updateProfile', async (req, res) => {
    const userId = req.body.id;
    console.log(userId);
    const newName = req.body.name;
    const newAge = req.body.age;
    const newPhoneNumber = req.body.phoneNumber;

    try {
        await UserModel.findByIdAndUpdate(userId, {
            name: newName,
            age: newAge,
            phoneNumber: newPhoneNumber
        });

        res.send('Successfully updated');
    } catch (err) { console.log(err) }
})

app.listen(3001, () => {
    console.log('Server is running on port 3001...');
})
