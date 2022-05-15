import { Router } from "express";
import {
  getCartProducts,
  addProduct,
  deleteProduct,
  makePurchase,
} from "../controllers/cartController.js";
import validateToken from "../middlewares/tokenMiddleware.js";

const cartRouter = Router();

cartRouter.use(validateToken);

cartRouter.post("/cart", addProduct);
cartRouter.get("/cart", getCartProducts);
cartRouter.delete("/cart", deleteProduct);
cartRouter.post("/purchase", validateToken, makePurchase);

export default cartRouter;
