const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const TripModel = require('./models/Trip');
const UserModel = require('./models/User');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validateToken } = require('./middlewares/AuthMiddleware');

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost/Trips2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.get('/', async (req, res) => {
    TripModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
});

app.post('/register', async (req, res) => {
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
    } catch (err) { console.log(err) }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if(!user) {
        res.send({error: 'User not found'});
    }

    bcrypt.compare(password, user.password).then((match) => {
        if(!match) {
            res.send({error : 'Wrong username or password'});
        }
        const accessToken = sign({ username: user.username, id: user._id }, "importandSecret");
        res.send(accessToken);
    })
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
    } catch (err) { console.log(err)}
    
});

app.get('/byId/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const trip = await TripModel.findById(id);
        res.send(trip);
    } catch (err) { console.log(err) }
    
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await TripModel.findByIdAndDelete(id).exec();
        res.send('deleted');
    } catch (err) { console.log(err) }
    
})

app.post('/insert',validateToken, async (req, res) => {

    const fromCity = req.body.fromCity;
    const toCity = req.body.toCity;
    const openSeats = req.body.openSeats;
    const about = req.body.about;

    const trip = new TripModel({
        fromCity: fromCity,
        toCity: toCity,
        openSeats: openSeats,
        about: about
    });

    try {
        await trip.save();
        res.send('Inserted data');
    } catch (error) {
        console.log(error);
    }
})

app.listen(3001, () => {
    console.log('Server is running on port 3001...');
})
