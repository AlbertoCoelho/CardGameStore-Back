import db from "../db.js";
import { ObjectId } from "mongodb";

export async function addProduct(req, res) {
  const { user } = res.locals;
  const { productId } = req.body;

  try {
    const cartCollection = db.collection("cart");
    let userCart = await cartCollection.findOne({ userId: user._id });

    if (!userCart) {
      await cartCollection.insertOne({ userId: user._id, products: [] });
      userCart = await cartCollection.findOne({ userId: user._id });
    }

    const allProducts = db.collection("products");
    const product = await allProducts.findOne({ _id: new ObjectId(productId) });

    await cartCollection.updateOne(
      { _id: userCart._id },
      { $push: { products: product } }
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCartProducts(req, res) {
  const { user } = res.locals;

  try {
    const cartCollection = db.collection("cart");
    const userCart = await cartCollection.findOne({ userId: user._id });

    if (!userCart) {
      return res.sendStatus(404);
    }

    res.send(userCart);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function deleteProduct(req, res) {
  const { user } = res.locals;
  const productIndex = req.body; // {index}

  try {
    const cartCollection = db.collection("cart");
    const userCart = await cartCollection.findOne({ userId: user._id });

    const productsArray = userCart.products;

    await cartCollection.updateOne(
      { _id: userCart._id },
      { $set: { products: productsArray.splice(productIndex, 1) } }
    );

    res.send(productsArray);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function makePurchase(req, res) {
  const { user } = res.locals;
  const { products } = req.body;

  try {
    const userPurchaseCollection = db.collection("userPurchase");

    await userPurchaseCollection.insertOne({
      userId: user._id,
      products: [...products],
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
