const Cours = require("../models/cours");

exports.getAllCours = (req, res) => {
  Cours.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getCours = (req, res) => {
  Cours.findByMnemonique(req.params.mnemonique, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Cours non trouvé" });
    res.json(row);
  });
};

exports.createCours = (req, res) => {
  const { mnemonique, intitule, credit, titulaire } = req.body;

  if (!mnemonique || !intitule || credit == null || !titulaire) {
    return res.status(400).json({ error: "Champs mnemonique, intitule, credit et titulaire requis" });
  }

  Cours.create(mnemonique, intitule, credit, titulaire, (err, newCours) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(newCours);
  });
};
exports.deleteCours = (req, res) => {
  Cours.delete(req.params.mnemonique, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Inscription non trouvé" });
    res.json(row);
  });
};

