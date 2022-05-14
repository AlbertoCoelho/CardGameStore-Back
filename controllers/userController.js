import db from "../db.js";
import bcrypt from 'bcrypt';

export async function signUp(req, res) {
  const user = req.body;
  const blabla = "blabla";
   
  try {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(user.password, SALT);
    delete user.confirmPassword;

    await db.collection('users').insertOne({ ...user, password: passwordHash, products: [] }); 
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}