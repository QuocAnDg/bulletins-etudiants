const Inscriptions = require("../models/inscriptions");

exports.getAllInscriptions = (req, res) => {
  Inscriptions.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getInscription = (req, res) => {
  Inscriptions.findByMatricule(req.params.matricule, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Inscription non trouvée" });
    res.json(row);
  });
};

exports.createInscription = (req, res) => {
  const { nom, prenom, annee_etude, cours_json } = req.body;

  if (!nom || !prenom || annee_etude < 1 || !cours_json) {
    return res.status(400).json({ error: "Champs nom, prenom, année_etude et cours_json requis" });
  }

  Inscriptions.create(nom, prenom, annee_etude, cours_json, (err, newInscription) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(newInscription);
  });
};

exports.deleteInscription = (req, res) => {
  Inscriptions.delete(req.params.matricule, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
};


exports.addCoursToInscription = (req, res) => {
  const { matricule } = req.params;
  const { mnemonique } = req.body;

  if (!mnemonique) {
    return res.status(400).json({ error: "Le champ mnemonique est requis" });
  }

  Inscriptions.addCours(matricule, mnemonique, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};
