const db = require("../utils/database");
const Inscription = require("./inscriptions");
const Cours = require("./cours");

const Notes = {
  findAll: (callback) => {
    db.all("SELECT * FROM liste_notes", [], callback);
  },

  findById: (id, callback) => {
    db.get("SELECT * FROM liste_notes WHERE id = ?", [id], callback);
  },

  create: (matricule, mnemonique, note, callback) => {
    Inscription.findByMatricule(matricule, (err, inscrit) => {
      if (err) return callback(err);
      if (!inscrit) return callback(new Error("Inscrit non trouvé"));

      Cours.findByMnemonique(mnemonique, (err, cours) => {
        if (err) return callback(err);
        if (!cours) return callback(new Error("Cours non trouvé"));

        const sql = "INSERT INTO liste_notes (matricule, mnemonique, note) VALUES (?, ?, ?)";
        db.run(sql, [matricule, mnemonique, note], function(err) {
          if (err) return callback(err);
          callback(null, { id: this.lastID, matricule, mnemonique, note });
        });
      });
    });
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM liste_notes WHERE id = ?";
    db.run(sql, [id], function(err) {
      if (err) return callback(err);
      callback(null, { message: "Note supprimée", id });
    });
  },
};

module.exports = Notes;
