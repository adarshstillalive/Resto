import express from "express";
import crudController from "../controller/crudController.js";

const crudRoute = express.Router();

crudRoute
  .post("/restaurant", crudController.addRestaurant)
  .get("/restaurant", crudController.fetchRestaurants)
  .put("/restaurant/:restoId", crudController.editRestaurant)
  .delete("/restaurant/:restoId", crudController.deleteRestaurant);

export default crudRoute;
