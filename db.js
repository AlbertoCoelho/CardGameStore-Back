import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
//MONGO_URI=mongodb+srv://cluster-admin:WGo7Fy1Ef3Bve5Ky@cluster0.sv429.mongodb.net/
const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();
const db = mongoClient.db("card_game_store");

export default db;
