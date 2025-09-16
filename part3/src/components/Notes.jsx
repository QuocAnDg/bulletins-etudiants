import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import { getNotes } from "../services/api";

function formatNote(note) {
  if (note < 10) return { text: note, className: "text-danger" }; // rouge si <10
  return { text: note, className: "" }; // normal sinon
}

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getNotes()
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur de chargement des notes");
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Liste des notes</h2>
      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th>Matricule</th>
            <th>Mnemonique</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((n, index) => (
            <tr key={index}>
              <td>{n.matricule}</td>
              <td>{n.mnemonique}</td>
              <td style={{ color: n.note < 10 ? "red" : "green" }}>{n.note}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Notes;
