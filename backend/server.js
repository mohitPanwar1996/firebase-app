import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { authMiddleware } from "./middlewares/authMiddleware.js";

import routes from "./src/appRoutes.js";
import './src/database/index.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Enable all CORS requests
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running fine!",
  });
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
