import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Spinner, Alert } from "react-bootstrap";
import { getInscriptionByMatricule, getNotes } from "../services/api";

function InscriptionDetail() {
  const { matricule } = useParams();
  const [inscription, setInscription] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    async function fetchData() {
      try {
        const ins = await getInscriptionByMatricule(matricule);
        const notes = await getNotes();
        setInscription(ins[0]);
        setNotes(notes);
      } catch {
        setError("Erreur lors du chargement des détails");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [matricule]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!inscription) return null;

  // Parse cours_json
  const coursList = JSON.parse(inscription.cours_json);

  return (
    <div className="container mt-4">
      <h2>{inscription.nom} {inscription.prenom}</h2>
      <p><strong>Matricule :</strong> {inscription.matricule}</p>
      <p><strong>Année :</strong> {inscription.annee_etude}</p>

      <h4 className="mt-4">Cours</h4>
      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th>Mnemonique</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {coursList.map((c, idx) => {
            const notes_etudiant = notes.find(
              n => n.matricule === inscription.matricule && n.mnemonique === c
            );
            return (
              <tr key={idx}>
                <td>{c}</td>
                <td style={{ color: notes_etudiant?.note < 10 ? "red" : "green" }}>
                  {notes_etudiant ? notes_etudiant.note : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default InscriptionDetail;
