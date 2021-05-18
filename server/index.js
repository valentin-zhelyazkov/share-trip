const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const TripModel = require('./models/Trip');

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

app.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const curTrip = await TripModel.findById(id);
    res.send(curTrip);
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
    const trip = await TripModel.findById(id);
    res.send(trip);
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await TripModel.findByIdAndDelete(id).exec();
    res.send('deleted');
})

app.post('/insert', async (req, res) => {

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
