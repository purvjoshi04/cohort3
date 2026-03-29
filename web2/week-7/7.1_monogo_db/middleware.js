import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

export function auth(req, res, next) {
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
    
        if (decodedInfo) {
            req.userId = decodedInfo.id;
            next();
        } else {
            res.json({
                message: "You are not logged in!"
            })
        }
}