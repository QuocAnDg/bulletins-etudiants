const Inscription = require("../models/inscriptions");

exports.getAllInscriptions = (req, res) => {
  Inscription.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getInscription = (req, res) => {
  Inscription.findByMatricule(req.params.matricule, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Inscription non trouvé" });
    res.json(row);
  });
};
