import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import crudRoute from "./interface/route/crudRoute.js";
import prisma from "./orm/prismaClient.js";

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

const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

const shutDown = async () => {
  console.log("Shutting down the server...");
  try {
    await prisma.$disconnect();
    console.log("Prisma disconnected");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  } catch (error) {
    console.log("Error during shutdown", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);
