import express from "express";
import crudController from "../controller/crudController.js";
const crudRoute = express.Router();

crudRoute.post("/restaurant", crudController.addRestaurant);
crudRoute.get("/restaurant", crudController.fetchRestaurants);
crudRoute.put("/restaurant/:restoId", crudController.editRestaurant);
crudRoute.delete("/restaurant/:restoId", crudController.deleteRestaurant);

export default crudRoute;
