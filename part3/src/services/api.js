import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function getInscriptions() {
  const res = await axios.get(`${API_URL}/inscriptions`);
  return res.data;
}
export async function getInscriptionByMatricule(matricule) {
  const res = await axios.get(`${API_URL}/inscriptions?matricule=${matricule}`);
  return res.data;
}

export async function getCours() {
  const res = await axios.get(`${API_URL}/cours`);
  return res.data;
}

export async function getNotes() {
  const res = await axios.get(`${API_URL}/notes`);
  return res.data;
}

