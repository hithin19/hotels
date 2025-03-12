// models/person.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  work: { type: String, enum: ["chef", "waiter", "manager"], required: true },
  mobile: { type: String, required: true },
  email: { type: String, unique: true },
  address: { type: String },
  salary: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Pre-save hook to hash the password
personSchema.pre('save', async function (next) {
  const person = this;
  if (!person.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Instance method to compare passwords
personSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

export const Person = mongoose.model("Person", personSchema);