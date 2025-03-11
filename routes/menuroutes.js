import express from "express";
import { Menu } from "../models/menu.js";
const router =express.Router();


// POST route to create a new menu item
router.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new Menu(data);
    const savedMenu = await newMenuItem.save();
    console.log("Saved menu item:", savedMenu);
    return res.status(200).json(savedMenu);
  } catch (err) {
    console.error("Error saving menu data:", err);
    return res.status(500).send("Internal server error");
  }
});

// GET route to fetch all menu items
router.get("/menu", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("Menu data fetched");
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching menu data:", err);
    return res.status(500).send("Internal server error");
  }
});

//filter menu items based on taste
router.get("/menu/:tastetype", async (req, res) => {
    try {
      const tastetype = req.params.tastetype;
      const validTypes = ["spicy", "sweet", "sour"];
  
      if (validTypes.includes(tastetype)) {
        const data = await Menu.find({ taste: tastetype });
        return res.status(200).json(data);
      } else {
        return res.status(400).json({ error: "Invalid taste type" });
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
      return res.status(500).send("Internal server error");
    }
  });
  
export const menuroutes =router;