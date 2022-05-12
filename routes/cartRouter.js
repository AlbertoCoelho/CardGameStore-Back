import { Router } from "express";
import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../controllers/cartController.js";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";

const cartRouter = Router();

cartRouter.post("/cart", tokenMiddleware, addProduct);
cartRouter.get("/cart", tokenMiddleware, getProducts);
cartRouter.delete("/cart", tokenMiddleware, deleteProduct);

export default cartRouter;
