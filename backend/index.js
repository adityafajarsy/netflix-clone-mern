require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.route");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocs = YAML.load("./swagger.yaml");

const { API_PORT, MONGO_URL } = process.env;

const app = express();
const PORT = API_PORT;

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URL).catch((err) => {
  if (err) {
    console.log("Tidak dapat terkoneksi MongoDB!");
    throw err;
  }
});

app.use(routes);

app.listen(PORT, () => {
  console.log("Server Running in port " + PORT);
});

module.exports = app;
