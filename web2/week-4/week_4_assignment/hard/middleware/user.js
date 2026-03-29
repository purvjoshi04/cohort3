const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })

function userMiddleware(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({
                message: "No token provided. You are not logged in!"
            });
        }
        const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodedInfo.id;
        next();
        
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return res.status(401).json({
            message: "Invalid token. You are not logged in!"
        });
    }
}

module.exports = userMiddleware;