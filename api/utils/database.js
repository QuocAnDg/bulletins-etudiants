require("dotenv").config();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) {
    console.error("Erreur de connexion:", err.message);
  } else {
    console.log("Connexion réussite à la DB");
  }
});

module.exports = db;
