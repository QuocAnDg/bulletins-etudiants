const db = require("../utils/database");
const Cours = require("./cours");

const Inscription = {
  findAll: (callback) => {
    db.all("SELECT * FROM liste_inscriptions", [], callback);
  },
  findByMatricule: (matricule, callback) => {
    db.get("SELECT * FROM liste_inscriptions WHERE matricule = ?", [matricule], callback);
  },
  create: (nom, prenom, annee_etude, cours_json, callback) => {
  // matricule décomposé exemple -> 2023 + 001
  // année courante = 2023
  // numéro de l'inscrit -> 001
  // je vais récupérer le matricule du dernier inscrit pour pouvoir récupérer son numéro courant 
  const year = new Date().getFullYear() - 2; // 2023
  
  const sqlLast = "SELECT matricule FROM liste_inscriptions WHERE matricule LIKE ? ORDER BY matricule DESC LIMIT 1";
  db.get(sqlLast, [`${year}%`], (err, row) => {
    if (err) return callback(err);

    let newMatricule;
    // s'il n'y a aucune personne inscrite
    if (!row) {
      newMatricule = `${year}001`;
    } else { 
      const lastMatricule = row.matricule; 
      const lastNumber = parseInt(lastMatricule.charAt(lastMatricule.length-1));  // dernier numéro de la dernière personne inscrite
      const nextNumber = "00" + (lastNumber + 1).toString(); // incrémenter pour le prochain inscrit
      newMatricule = `${year}${nextNumber}`; // nouveau matricule de la nouvelle personne inscrite
    }
    const newCoursJSON = JSON.stringify(cours_json);
    const sqlInsert = "INSERT INTO liste_inscriptions (matricule, nom, prenom, annee_etude, cours_json) VALUES (?, ?, ?, ?, ?)";
    db.run(sqlInsert, [newMatricule, nom, prenom, annee_etude, newCoursJSON], function(err) {
      if (err) return callback(err);
      callback(null, { matricule: newMatricule, nom, prenom, annee_etude, newCoursJSON });
    });
  });
},

  delete: (matricule, callback) => {
      const sql = "DELETE FROM liste_inscriptions WHERE matricule = ?";
      db.run(sql, [matricule], function(err) {
        if (err) return callback(err);    
        callback(null, { message: "Inscription supprimée", matricule });
      });
    },

   updateCoursJSON: (matricule, newCoursJSON, callback) => {
    const sql = "UPDATE liste_inscriptions SET cours_json = ? WHERE matricule = ?";
    db.run(sql, [newCoursJSON, matricule], callback);
  },

  addCours: (matricule, mnemoniqueCours, callback) => {
    // vérifier si le cours est bien présent dans la liste de cours
    Cours.findByMnemonique(mnemoniqueCours, (err, cours) => {
      if (err) return callback(err);
      if (!cours) return callback(new Error("Cours non disponible dans la liste des cours"));
      // vérifier le matricule de l'inscrit est bien dans la liste des inscriptions
      Inscription.findByMatricule(matricule, (err, inscrit) => {
        if (err) return callback(err);
        if (!inscrit) return callback(new Error("Inscrit non trouvé"));

        // récupérer la liste des cours de la personne inscrite avec le matricule X
        let coursActuels = [];
        try {
          coursActuels = inscrit.cours_json ? JSON.parse(inscrit.cours_json) : [];
        } catch (e) {
          coursActuels = [];
        }

        if (coursActuels.includes(mnemoniqueCours)) {
          return callback(new Error("Cours déjà présent pour la personne inscrite"));
        }
        // ajout du nouveau cours dans sa liste de cours
        coursActuels.push(mnemoniqueCours);
        const newCoursJSON = JSON.stringify(coursActuels);
        // Liste de cours mis à jour de l'inscrit
        Inscription.updateCoursJSON(matricule, newCoursJSON, (err) => {
          if (err) return callback(err);
          callback(null, { matricule, cours_json: newCoursJSON, cours });
        });
      });
    });
  }
};

module.exports = Inscription;
