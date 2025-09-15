const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

const inscriptionsRoute = require("./routes/inscriptions");
const coursRoute = require("./routes/cours");
const notesRoute = require("./routes/notes");

app.use("/inscriptions", inscriptionsRoute);
app.use("/cours", coursRoute);
app.use("/notes", notesRoute);

app.listen(PORT, () => {
  console.log(`lancée sur http://localhost:${PORT}`);
});
