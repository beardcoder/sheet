import cors from "cors";
import * as dotenv from "dotenv";
import express, { Router } from "express";
import auth from "./auth/auth";
import apiRouter from "./routes/v1";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(auth.initialize());
app.use(Router().use("/api/v1", apiRouter));
app.use(express.static("public"));

app.listen(3000, () =>
  console.log("🚀 Server ready at: http://localhost:3000")
);
