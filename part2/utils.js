const NOTE_REUSSIE = 10;
const NBR_CREDITS_ANNEE = 60;

// Récupère la liste des cours inscrits pour un inscrit
function cours_inscrits(inscrit) {
  return inscrit.cours_json ? JSON.parse(inscrit.cours_json) : [];
}

function calculECTS(inscrit, liste_cours, liste_notes, avecValidation = false) {

  let total = 0;
  cours_inscrits(inscrit).forEach(mnemo => {
      const cours = liste_cours.find(c => c.mnemonique === mnemo);
      if (cours){
        if (avecValidation) {
          const note = liste_notes.find(n => n.matricule === inscrit.matricule && n.mnemonique === mnemo);
          if (note && note.note >= NOTE_REUSSIE) {
            total += cours.credit;
          }
        } else {
        total += cours.credit;
        }
      }
  });

  return total;
}

function ects_total_inscrits(inscrit, liste_cours) {
  return calculECTS(inscrit, liste_cours, [], false);
}

function ects_obtenus(inscrit, liste_cours, liste_notes) {
  return calculECTS(inscrit, liste_cours, liste_notes, true);
}

function moyenne_ponderee(inscrit, liste_cours, liste_notes) {
  let cours_inscrits = [];
  try {
    cours_inscrits = inscrit.cours_json ? JSON.parse(inscrit.cours_json) : [];
  } catch (e) {
    cours_inscrits = [];
  }

  let totalPondere = 0;
  let totalCredits = 0;

  cours_inscrits.forEach(mnemo => {
    const cours = liste_cours.find(c => c.mnemonique === mnemo);
    if (!cours) return;

    const note = liste_notes.find(n => n.matricule === inscrit.matricule && n.mnemonique === mnemo);
    if (note && note.note !== null && !isNaN(note.note)) {
      totalPondere += note.note * cours.credit;
      totalCredits += cours.credit;
    }
  });

  if (totalCredits === 0) return null; 
  return totalPondere / totalCredits;
}

function reussite(inscription, liste_cours, liste_notes) {
  const ectsObtenus = ects_obtenus(inscription, liste_cours, liste_notes);
  const moyenne = moyenne_ponderee(inscription, liste_cours, liste_notes);

  if (ectsObtenus >= NBR_CREDITS_ANNEE) return true;

  const coursMnem = cours_inscrits(inscription);
  for (const mnemo of coursMnem) {
    const note = liste_notes.find(n => n.matricule === inscription.matricule && n.mnemonique === mnemo);
    if (!note || note.note === null) { // dès qu'un cours n'a pas de note, on échoue
      return false; 
    }
  }

  return moyenne !== null && moyenne >= NOTE_REUSSIE;
}



function details(inscrit, liste_cours, liste_notes) {
  return cours_inscrits(inscrit)
    .map(mnemo => {
      const cours = liste_cours.find(c => c.mnemonique === mnemo);
      const noteObj = liste_notes.find(
        n => n.matricule === inscrit.matricule && n.mnemonique === mnemo
      );

      return {
        mnemonique: mnemo,
        intitule: cours ? cours.intitule : null,
        credit: cours ? cours.credit : null,
        titulaire: cours ? cours.titulaire : null,
        note: noteObj ? noteObj.note : null
      };
    })
    .sort((a, b) => a.mnemonique.localeCompare(b.mnemonique));
}

function rapportAnomalies(inscriptions, coursList, notesList) {
  const anomalies = [];

  inscriptions.forEach(ins => {
    const { matricule, annee_etude } = ins;

    const coursMnemo = cours_inscrits(ins);
     const notesEtudiant = notesList.filter(n => n.matricule === matricule);
    notesEtudiant.forEach(note => {
      if (!coursMnemo.includes(note.mnemonique)) {
        anomalies.push({ type: "NOTE_SANS_INSCRIPTION", matricule, annee: annee_etude, detail: note.mnemonique });
      }
    });
     coursMnemo.forEach(mnemo => {
      const cours = coursList.find(c => c.mnemonique === mnemo);
      if (!cours) {
        anomalies.push({ type: "COURS_INCONNU", matricule, annee: annee_etude, detail: mnemo });
      }
    });
    if (coursMnemo.length === 0){
      anomalies.push({ type: "INSCRIPTION_SANS_COURS", matricule, annee: annee_etude, detail: null });
    }
    const vus = new Set(); 
    notesEtudiant.forEach(note => {
      const mnemo = note.mnemonique;
      if (vus.has(mnemo)) {
        anomalies.push({ type: "DUPLICATA_NOTE", matricule, annee: annee_etude, detail: mnemo });
      } else {
        vus.add(mnemo);
      }
    });

    coursMnemo.forEach(mnemo => {
      const cours = coursList.find(c => c.mnemonique === mnemo);
      if (!cours) return;
      const note = notesList.find(n => n.matricule === matricule && n.mnemonique === mnemo);
      if (note && (cours.credit === null || cours.credit <= 0)) {
        anomalies.push({ type: "NOTE_SANS_CREDIT", matricule, annee: annee_etude, detail: mnemo });
      }
    });
  });

  return anomalies;
}


module.exports = {
  cours_inscrits,
  calculECTS,
  ects_total_inscrits,
  ects_obtenus,
  moyenne_ponderee,
  reussite,
  details,
  rapportAnomalies
};

