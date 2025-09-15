const express = require("express");
const router = express.Router();
const inscriptionController = require("../controllers/inscriptions");

router.get("/", inscriptionController.getAllInscriptions);
router.get("/:matricule", inscriptionController.getInscription);
router.post("/", inscriptionController.createInscription);
router.delete("/:matricule", inscriptionController.deleteInscription)
router.post("/:matricule/cours", inscriptionController.addCoursToInscription);

module.exports = router;
