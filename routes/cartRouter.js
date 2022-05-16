import { Router } from "express";
import {
  getCartProducts,
  addProduct,
  makePurchase,
} from "../controllers/cartController.js";
import validateToken from "../middlewares/tokenMiddleware.js";

const cartRouter = Router();

cartRouter.use(validateToken);

cartRouter.post("/cart", addProduct);
cartRouter.get("/cart", getCartProducts);
// FIXME: ERRO AO DELETAR PRODUTO
// cartRouter.delete("/cart", deleteProduct);
cartRouter.post("/purchase", makePurchase);

export default cartRouter;
