import express from "express";
import { Person } from "../models/person.js";

const router = express.Router();

// POST route to create a new person
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();
    console.log("Saved person:", savedPerson);
    return res.status(200).json(savedPerson);
  } catch (err) {
    console.error("Error saving person data:", err);
    return res.status(500).send("Internal server error");
  }
});

// GET route to fetch all persons
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Person data fetched");
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching person data:", err);
    return res.status(500).send("Internal server error");
  }
});

// GET route to fetch persons by work type
router.get("/:worktypes", async (req, res) => {
  try {
    const worktype = req.params.worktypes;
    const validWorkTypes = ["chef", "manager", "waiter"];

    if (validWorkTypes.includes(worktype)) {
      const response = await Person.find({ work: worktype });
      console.log("Response fetched for work type:", worktype);
      return res.status(200).json(response);
    } else {
      console.log("Invalid worktype:", worktype);
      return res.status(400).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.error("Error fetching person data:", error);
    return res.status(500).send("Internal server error");
  }
});

// PUT route to update a person by id
router.put("/:id", async (req, res) => {
  try {
    const pid = req.params.id; // extract id from url parameter
    const updperson = req.body;
    const response = await Person.findByIdAndUpdate(pid, updperson, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "id not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating person data:", error);
    return res.status(500).send("Internal server error");
  }
});

// DELETE route to delete a person by id
router.delete("/:id", async (req, res) => {
  try {
    const pid = req.params.id;
    const response = await Person.findByIdAndDelete(pid);
    if (!response) {
      return res.status(404).json({ error: "id not found" });
    }
    console.log("data deleted");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting person data:", error);
    return res.status(500).send("Internal server error");
  }
});

export const personroutes = router;
