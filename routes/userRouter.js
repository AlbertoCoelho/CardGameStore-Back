import { Router } from "express";
import userMiddleware from '../middlewares/userMiddleware.js';
import { signUp } from "../controllers/userController.js";
import validateToken from "../middlewares/tokenMiddleware.js";

const userRouter = Router();

userRouter.post('/sign-up', userMiddleware, signUp);

export default userRouter;