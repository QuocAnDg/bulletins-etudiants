const axios = require("axios");
require("dotenv").config();

const API_URL = process.env.API_URL;

async function getInscriptions() {
  const res = await axios.get(`${API_URL}/inscriptions`);
  return res.data;
}

async function getCours() {
  const res = await axios.get(`${API_URL}/cours`);
  return res.data;
}

async function getNotes() {
  const res = await axios.get(`${API_URL}/notes`);
  return res.data;
}

module.exports = { getInscriptions, getCours, getNotes };
