import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from "../db.js";

const login = async (req,res) => {
  const { email,password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if(!user) return res.sendStatus(401);
    if(user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({token, userId: user._id});
      res.send(token);
      return;
    } 

    res.sendStatus(401); // Unauthorized

  } catch (err) {
    console.log("Error logging in user.", err);
    res.status(500).send("Error logging in user.");
  }
}

export default login;