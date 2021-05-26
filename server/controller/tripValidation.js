const { check, validationResult } = require('express-validator');

exports.tripValidator = [
    check('fromCity').isLength({ min:5 }).withMessage('The fromCity name is too short'),
    check('toCity').isLength({ min:5 }).withMessage('The toCity name is too short'),
    check('openSeats').isFloat({min:5,max:5}).withMessage('The name must be between 1 and 4 characters long'), 
]

exports.validateTrip = (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
         return res.send(errors.array()[0]);
    }
    next();
}
