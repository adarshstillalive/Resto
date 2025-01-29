import express from "express";
import crudController from "../controller/crudController.js";
const crudRoute = express.Router();

crudRoute.post("/restaurant", crudController.addRestaurant);

export default crudRoute;
