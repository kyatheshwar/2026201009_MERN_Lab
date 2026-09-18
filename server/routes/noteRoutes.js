const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// POST /api/notes — create a note, return 201 with the saved document
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "title and content are required" });
    }
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/notes — all notes, newest first
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/notes/:id — 200 on success, 404 if the note does not exist
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted", note: deleted });
  } catch (err) {
    // An invalid ObjectId also means no such note exists
    if (err.name === "CastError") {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
