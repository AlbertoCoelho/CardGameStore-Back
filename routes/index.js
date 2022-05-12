import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import productsRouter from "./productsRouter.js";
import cartRouter from "./cartRouter.js";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(productsRouter);
router.use(cartRouter);

export default router;
