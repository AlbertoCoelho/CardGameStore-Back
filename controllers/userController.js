import db from "../db.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const user = req.body;

  try {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(user.password, SALT);
    delete user.confirmPassword;

    const users = await db
      .collection("users")
      .insertOne({ ...user, password: passwordHash });

    const cartCollection = db.collection("cart");
    await cartCollection.insertOne({ userId: users.insertedId, products: [] });
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
