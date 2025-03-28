import mongoose from "mongoose";

import dotenv from "dotenv"

dotenv.config()


const mongoURL = process.env.DB_URL_LOCAL;

async function connectDB() {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectDB();

export const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB server");
});
