const { check, validationResult } = require('express-validator');

exports.loginValidator = [
    check('username').isLength({ min:3, max: 15 }).withMessage('The username or password are incorrect'),
    check('password').isLength({ min:3, max: 15 }).withMessage('The username or password are incorrect'), 
]

exports.validateLogin = (req, res, next) => {
    
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
             return res.send(errors.array()[0]);
        }
    

    next();
}
