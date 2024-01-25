const jsonwebtoken = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        res.json({
            status: 0,
            message: 'Please Login to Continue',
        });
        return;
    }
    
    // now that token is okay we need to verify the token
    const tokenData = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    if(!tokenData){
        res.json({
            status: 0,
            message: 'Invalid Token. Please Login Again',
            data: null
        });  
        return;
    }
    next();
}

module.exports = authMiddleware;