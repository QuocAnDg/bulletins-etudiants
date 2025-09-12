const express = require("express");
const router = express.Router();
const etudiantController = require("../controllers/inscriptions");

router.get("/", etudiantController.getAllInscriptions);
router.get("/:matricule", etudiantController.getInscription);

module.exports = router;
