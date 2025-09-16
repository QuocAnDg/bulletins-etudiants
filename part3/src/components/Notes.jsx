import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Form, Row, Col } from "react-bootstrap";
import { getNotes } from "../services/api";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterMatricule, setFilterMatricule] = useState("");
  const [filterMnemo, setFilterMnemo] = useState("");

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

  const filteredNotes = notes.filter(n =>
    n.matricule.includes(filterMatricule) &&
    n.mnemonique.includes(filterMnemo)
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Liste des notes</h2>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            placeholder="Filtrer par matricule"
            value={filterMatricule}
            onChange={e => setFilterMatricule(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Control
            placeholder="Filtrer par mnemonique"
            value={filterMnemo}
            onChange={e => setFilterMnemo(e.target.value)}
          />
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th>Matricule</th>
            <th>Mnemonique</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotes.map((n, index) => (
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
