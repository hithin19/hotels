import express from "express";
import "./db.js";
import { personroutes } from "./routes/personroute.js";
import { menuroutes } from "./routes/menuroutes.js";
import { passportAuth } from "./auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const log_request = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] ${req.method} request to: ${req.originalUrl}`
  );
  next();
};

app.use(log_request);
app.use(passportAuth.initialize());

const localauthmiddlware = passportAuth.authenticate('local', { session: false });


app.use("/person", localauthmiddlware, personroutes);
app.use("/menu", localauthmiddlware, menuroutes);


// Home route without authentication
app.get("/", (req, res) => {
  res.send("Welcome to hotel home page");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
