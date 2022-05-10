import { Router } from "express";
import  login  from "../controllers/authController.js";
import  loginMiddleware from '../middlewares/loginMiddleware.js';

const authRouter = Router();

authRouter.post('/login', loginMiddleware, login);

export default authRouter;