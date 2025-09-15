const express = require("express");
const router = express.Router();
const coursController = require("../controllers/cours");

router.get("/", coursController.getAllCours);
router.get("/:mnemonique", coursController.getCours);
router.post("/", coursController.createCours);
router.delete("/:mnemonique", coursController.deleteCours);

module.exports = router;
