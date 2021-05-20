const { verify } = require('jsonwebtoken');

const validateToken = (req,res,next) => {
    const accessToken = req.header('accessToken');
    
    if(!accessToken){
        return res.send({error: 'User Not Logged In!!!'});
    }

    try {
        const validToken = verify(accessToken, 'importandSecret');
        if(validToken){
            return next();
        }
    } catch (err) {
        return res.send({error: err });
    }
}

module.exports = { validateToken };
