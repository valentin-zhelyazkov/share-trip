const mongoose = require('mongoose');

const TripScheme = new mongoose.Schema({
    fromCity: {
        type: String,
        required: true
    },
    toCity: {
        type: String,
        required: true
    },
    openSeats: {
        type: Number,
        required: true
    },
    about: {
        type: String
    }
});

const Trip = mongoose.model('Trip', TripScheme);
module.exports = Trip;