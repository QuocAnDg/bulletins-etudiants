import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Card, Row, Col } from "react-bootstrap";
import { getInscriptions } from "../services/api";
function YearCard({ annee, total }) {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Année {annee}</Card.Title>
        <Card.Text style={{ fontWeight: "bold", fontSize:"24px" }}>{total} étudiants</Card.Text>
      </Card.Body>
    </Card>
  );
}
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

  const totalParAnnee = (annee) => inscriptions.filter(ins => ins.annee_etude === annee).length;

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Liste des inscriptions</h2>
      <h3 className="mb-3">Nombres total d'étudiants inscrits : {inscriptions.length}</h3>
      <Row className="mb-4">
        <Col md={4}>
         <YearCard annee={1} total={totalParAnnee(1)} />
        </Col>
        <Col md={4}>
          <YearCard annee={2} total={totalParAnnee(3)} />
        </Col>
        <Col md={4}>
          <YearCard annee={3} total={totalParAnnee(2)} />
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Année</th>
            <th>Nombre de cours</th>
          </tr>
        </thead>
        <tbody>
          {inscriptions.map(ins => (
            <tr key={ins.matricule}>
              <td>{ins.matricule}</td>
              <td>{ins.nom}</td>
              <td>{ins.prenom}</td>
              <td>{ins.annee_etude}</td>
              <td>{JSON.parse(ins.cours_json).length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Inscriptions;
