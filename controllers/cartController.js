import db from "../db.js";

export async function addProduct(req, res) {
  const { user } = req.locals;
  const productId = req.body; // {_id}

  try {
    const product = await db
      .collection("products")
      .findOne({ _id: productId })
      .toArray();
    await db.collection("cart").insertOne({ ...product, user: user });
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
      .findMany({ user: user })
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
      .findOne({ _id: productId, user: user })
      .toArray();
    await db.collection("cart").deleteOne({ ...product });
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
