import axios from "axios";

const API_URL = "https://b0s0kwos00g48ow8cg0skg4w.89.116.111.143.sslip.io";

export async function getInscriptions() {
  const res = await axios.get(`${API_URL}/inscriptions`);
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
