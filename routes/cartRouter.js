import { Router } from "express";
import {
  getCart,
  addProduct,
  deleteProduct,
} from "../controllers/cartController.js";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";

const cartRouter = Router();

cartRouter.get("/cart", tokenMiddleware, getCart);
cartRouter.post("/cart", tokenMiddleware, addProduct);
cartRouter.delete("/cart", tokenMiddleware, deleteProduct);

export default cartRouter;
