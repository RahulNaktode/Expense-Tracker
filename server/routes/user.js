import express from "express";
import { checkJWT } from "../middlewars/jwt.js";
import { postSignup, postLogin, putUpdatedProfile, updatePassword } from "../controllers/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", postSignup);
userRouter.post("/login", postLogin);
userRouter.put("/profile", checkJWT, putUpdatedProfile);
userRouter.put("/password", checkJWT, updatePassword);

export default userRouter;