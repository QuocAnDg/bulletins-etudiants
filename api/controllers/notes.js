const Notes = require("../models/notes");

exports.getAllNotes = (req, res) => {
  Notes.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getNote = (req, res) => {
  Notes.findById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Note non trouvée" });
    res.json(row);
  });
};

exports.createNote = (req, res) => {
  const { matricule, mnemonique, note } = req.body;

  if (!matricule || !mnemonique || note == null) {
    return res.status(400).json({ error: "Champs matricule, mnemonique et note requis" });
  }

  Notes.create(matricule, mnemonique, note, (err, newNote) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(newNote);
  });
};

exports.deleteNote = (req, res) => {
  Notes.delete(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
};
