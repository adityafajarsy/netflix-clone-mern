import "dotenv/config";

import express from "express";
import cors from "cors";
import routes from "./routes/index.route.js";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
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
export default app;
