const fs = require("fs");
const { getInscriptions, getCours, getNotes } = require("./api");
const { ects_total_inscrits, ects_obtenus, moyenne_ponderee, reussite, details, rapportAnomalies } = require("./utils");

async function bulletinsEtudiantsEtAnomalies() {
  try {
    const inscriptions = await getInscriptions();
    const coursList = await getCours();
    const notesList = await getNotes();

    const bulletins = [];

    for (const ins of inscriptions) {
      const { matricule, nom, prenom, annee_etude } = ins;

      bulletins.push({
        matricule,
        nom,
        prenom,
        annee: annee_etude,
        ects_total_inscrits: ects_total_inscrits(ins, coursList),
        ects_obtenus: ects_obtenus(ins, coursList, notesList),
        moyenne_ponderee: moyenne_ponderee(ins, coursList, notesList),
        reussite: reussite(ins, coursList, notesList),
        details: details(ins, coursList, notesList)
      });
    }
    const anomalies = rapportAnomalies(inscriptions, coursList, notesList);

    fs.writeFileSync("output/bulletins.json", JSON.stringify(bulletins, null, 2));
    fs.writeFileSync("output/anomalies.json", JSON.stringify(anomalies, null, 2));

    return bulletins;
  } catch (err) {
    console.error(err);
  }
}
bulletinsEtudiantsEtAnomalies();
