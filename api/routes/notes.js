const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notes");

router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNote);
router.post("/", noteController.createNote);
router.delete("/:id", noteController.deleteNote)

module.exports = router;
