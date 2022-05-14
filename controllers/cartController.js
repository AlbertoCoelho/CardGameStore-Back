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

export async function getProducts(req, res) {
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

// NÃO ESTÁ CERTA - corrigir
export async function deleteProduct(req, res) {
  const { user } = res.locals;
  const productId = req.body; // {_id}

  try {
    const product = await db
      .collection("cart")
      .findOne({ products: { _id: productId } });
    await db.collection("cart").deleteOne({ ...product });
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
