import { Router } from "express";
import {
  getCartProducts,
  addProduct,
  deleteProduct,
} from "../controllers/cartController.js";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";

const cartRouter = Router();

cartRouter.post("/cart", tokenMiddleware, addProduct);
cartRouter.get("/cart", tokenMiddleware, getCartProducts);
cartRouter.delete("/cart", tokenMiddleware, deleteProduct);

export default cartRouter;
