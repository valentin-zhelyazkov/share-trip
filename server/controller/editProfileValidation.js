const { body, check, validationResult } = require('express-validator');

exports.userProfileValidator = [
    check('name').isLength({ min:3, max: 15 }).withMessage('The name must be between 3 and 15 characters long'),
    check('age').isFloat({ min:18 }).withMessage('The age must be minimum 18'),
    check('phoneNumber').isLength(10).withMessage('The phoneNumber must be 10 digits')
]

exports.validateUserProfile = (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
         return res.send(errors.array()[0]);
    }
    next();
}