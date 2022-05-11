import { Router } from "express";
import getProducts from "../controllers/productsController.js";

const authRouter = Router();

authRouter.get("/products", getProducts);

export default authRouter;
