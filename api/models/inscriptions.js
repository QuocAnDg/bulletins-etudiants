const db = require("../utils/database");

const Inscription = {
  findAll: (callback) => {
    db.all("SELECT * FROM liste_inscriptions", [], callback);
  },
  findByMatricule: (matricule, callback) => {
    db.get("SELECT * FROM liste_inscriptions WHERE matricule = ?", [matricule], callback);
  },
   create: (matricule, nom, prenom, callback) => {
    const sql = "INSERT INTO liste_inscriptions (matricule, nom, prenom) VALUES (?, ?, ?)";
    db.run(sql, [matricule, nom, prenom], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, { matricule, nom, prenom });
    });
  }
};

module.exports = Inscription;
