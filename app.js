import express from "express";
import "./db.js" // Ensure the DB connection is established before handling requests
import { personroutes } from "./routes/personroute.js";
import { menuroutes } from "./routes/menuroutes.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the person routes for all requests
app.use("/", personroutes);
app.use("/",menuroutes)
// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
