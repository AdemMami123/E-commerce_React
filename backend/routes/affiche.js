
const express = require("express");
const multer = require("multer");
const path = require("path");
const Affiche = require("../models/affiche");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Specify the folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname) // Add timestamp to file name to prevent conflicts
    );
  },
});
const upload = multer({ storage: storage });

// Route to add a new affiche
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file ? req.file.filename : null; // Get the uploaded image filename

    if (!title  || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newAffiche = new Affiche({
      title,
      image,
    });

    await newAffiche.save();
    res.status(201).json({ message: "Affiche added successfully!", affiche: newAffiche });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding affiche", error: error.message });
  }
});

// Route to get all affiches
router.get("/", async (req, res) => {
    try {
      const affiches = await Affiche.find(); // Fetch all affiches from the database
      res.status(200).json(affiches); // Return the list of affiches
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching affiches", error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const affiche = await Affiche.findByIdAndDelete(req.params.id);
  
      if (!affiche) {
        return res.status(404).json({ message: 'Affiche not found' });
      }
  
      // Optionally, you can add logic to delete the associated image from the filesystem here
  
      res.status(200).json({ message: 'Affiche deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting affiche', error: error.message });
    }
  });

module.exports = router;
