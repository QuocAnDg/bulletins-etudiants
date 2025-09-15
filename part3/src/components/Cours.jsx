import { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import { getCours } from "../services/api";

function Cours() {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCours()
      .then(data => {
        setCours(data);
        setLoading(false);
      })
      .catch(() => setError("Erreur lors du chargement des cours"))
      .finally(() => setLoading(false));
       
  }, []);

  if (loading) return <Spinner animation="border" className="mt-3" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2>Liste des cours</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Mnemonique</th>
            <th>Intitulé</th>
            <th>Crédits</th>
            <th>Titulaire</th>
          </tr>
        </thead>
        <tbody>
          {cours.map(c => (
            <tr key={c.mnemonique}>
              <td>{c.mnemonique}</td>
              <td>{c.intitule}</td>
              <td>{c.credit}</td>
              <td>{c.titulaire}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cours;
