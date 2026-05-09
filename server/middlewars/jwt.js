import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkJWT = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.json({
            success: false,
            message: "Invalid or expired token",
            data: null
        })
    }
}

export { checkJWT };