import express from "express";
import crudController from "../controller/crudController.js";
const crudRoute = express.Router();

crudRoute.post("/restaurant", crudController.addRestaurant);
crudRoute.get("/restaurant", crudController.fetchRestaurants);

export default crudRoute;
