import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import { getInscriptions } from "../services/api";
import "../App.css"
function Inscriptions() {
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInscriptions()
      .then(data => {
        setInscriptions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur de chargement des inscriptions");
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Liste des inscriptions</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Année</th>
          </tr>
        </thead>
        <tbody>
          {inscriptions.map(ins => (
            <tr key={ins.matricule}>
              <td>{ins.matricule}</td>
              <td>{ins.nom}</td>
              <td>{ins.prenom}</td>
              <td>{ins.annee_etude}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Inscriptions;
