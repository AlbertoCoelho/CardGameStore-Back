import db from "../db.js";

export async function addProduct(req, res) {
  const { user } = req.locals;
  const { productId } = req.body;

  try {
    const product = await db
      .collection("products")
      .findOne({ _id: productId })
      .toArray();
    await db
      .collection("cart")
      .insertOne({ productId: product[0]._id, user: user._id });
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getProducts(req, res) {
  const { user } = req.locals;

  try {
    const products = await db
      .collection("products")
      .findMany({ user: user._id })
      .toArray();
    res.send(products);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function deleteProduct(req, res) {
  const { user } = req.locals;
  const productId = req.body; // {_id}

  try {
    const product = await db
      .collection("cart")
      .findOne({ productId: productId, user: user._id })
      .toArray();
    await db.collection("cart").deleteOne({ ...product });
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
