const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

const inscriptionsRoute = require("./routes/inscriptions");

app.use("/inscriptions", inscriptionsRoute);


app.listen(PORT, () => {
  console.log(`lancée sur http://localhost:${PORT}`);
});
