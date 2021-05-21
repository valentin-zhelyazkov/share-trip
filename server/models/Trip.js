const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types; 

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
    } ,
    creator: {
        type: ObjectId,
        required: true,
        ref: "User"
    }
});

const Trip = mongoose.model('Trip', TripScheme);
module.exports = Trip;
