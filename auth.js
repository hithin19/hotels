import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { Person } from "./models/person.js";

const customFields = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

passport.use(
  new LocalStrategy(customFields, async (req, username, password, done) => {
    // If GET request, extract credentials from query parameters
    if (req.method === "GET") {
      username = req.query.username;
      password = req.query.password;
    }
    // Check if credentials are provided
    if (!username || !password) {
      return done(null, false, { message: "Missing credentials" });
    }
    try {
      const user = await Person.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

export const passportAuth = passport;
