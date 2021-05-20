const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', UserScheme);
module.exports = User;
