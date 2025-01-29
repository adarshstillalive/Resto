import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import crudRoute from "./interface/route/crudRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/", crudRoute);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
