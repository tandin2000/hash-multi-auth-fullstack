const jwt = require('jsonwebtoken')
function authenticateToken(res, req, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];
        if(token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if( err ) return res.sendStatus(403)
            req.user = user
        })
    } catch (e) {
       console.log("Error while reading headers");
       logger.error(`Error while reading headers (JWT)`);    
    }
    
}

module.exports = { authenticateToken };
