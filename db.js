import mongoose from "mongoose";

const mongoURL = "mongodb://localhost:27017/hotel";

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
