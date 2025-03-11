import express from "express";
import "./db.js"; // Ensure the DB connection is established before handling requests
import { personroutes } from "./routes/personroute.js";
import { menuroutes } from "./routes/menuroutes.js";
import dotenv from "dotenv";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Person } from "./models/person.js";

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//middleware function declaration
const log_request = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] ${req.method} request made to: ${
      req.originalUrl
    }`
  );
  next(); // Move on to the next middleware/route handler
};

app.use(log_request);

passport.use(
  new LocalStrategy(async (USERname, password, done) => {
    //auth logic
    try {
      console.log("recieved creentials", USERname, password);
      const user = await Person.findOne({ username: USERname });
      if (!user) {
        return done(null, false, { message: "incorrect username" });
      }
      const ispasswordmatch = user.password === password ? true : false;
      if (ispasswordmatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

app.use(passport.initialize())

const localauthmiddlware=passport.authenticate('local',{session:false})

// Use the person routes for all requests
app.use("/",localauthmiddlware, personroutes);
app.use("/", localauthmiddlware,menuroutes);


app.get("/",localauthmiddlware,(req, res) => {
  res.send("hi welcome to hotel home page");
});
// Start the server on port 3000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
