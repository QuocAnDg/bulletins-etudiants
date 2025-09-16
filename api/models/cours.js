const db = require("../utils/database");

const Cours = {
  findAll: (callback) => {
    db.all("SELECT * FROM liste_cours", [], callback);
  },
  findByMnemonique: (mnemonique, callback) => {
    db.get("SELECT * FROM liste_cours WHERE mnemonique = ?", [mnemonique], callback);
  },
  create: (mnemonique, intitule, credit, titulaire, callback) => {
  const regex = /^[A-Z]{3}[0-9]{3}$/;
  if (!regex.test(mnemonique)) {
    return callback(new Error("Le mnemonique doit contenir 3 lettres majuscules suivies de 3 chiffres (ex: INF120)"));
  }

  const sql = "INSERT INTO liste_cours (mnemonique, intitule, credit, titulaire) VALUES (?, ?, ?, ?)";
  db.run(sql, [mnemonique, intitule, credit, titulaire], function(err) {
    if (err) {
      return callback(err);
    } 
    callback(null, { mnemonique, intitule, credit, titulaire });
  });
},
    delete: (mnemonique, callback) => {
      const sql = "DELETE FROM liste_cours WHERE mnemonique = ?";
      db.run(sql, [mnemonique], function(err) {
        if (err) return callback(err);
        callback(null, { message: "Cours supprimé", mnemonique });
      });
    },
};

module.exports = Cours;
