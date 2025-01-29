import { Request, Response } from "express";
import PostgresCrudRepository from "../../infrastructure/database/PostgresCrudRepository.js";
import AddRestaurant from "../../useCase/AddRestaurant.js";
import { createResponse } from "../../utils/createResponse.js";
import FetchRestaurants from "../../useCase/FetchRestaurants.js";
import EditRestaurant from "../../useCase/EditRestaurant.js";
import DeleteRestaurant from "../../useCase/DeleteRestaurant.js";

const crudRepository = new PostgresCrudRepository();

const addRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurant } = req.body;
    if (!restaurant) {
      res
        .status(400)
        .json(createResponse(false, "Restaurant data is required"));
    }

    const addRestaurantUseCase = new AddRestaurant(crudRepository);
    await addRestaurantUseCase.execute(restaurant);
    res.status(201).json(createResponse(true, "Restaurant added successfully"));
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res
      .status(500)
      .json(createResponse(false, "Internal server error", {}, error));
  }
};

const fetchRestaurants = async (req: Request, res: Response) => {
  try {
    const fetchRestaurantsUseCase = new FetchRestaurants(crudRepository);
    const restaurants = await fetchRestaurantsUseCase.execute();

    res
      .status(200)
      .json(
        createResponse(true, "Restaurants fetched successfully", restaurants)
      );
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res
      .status(500)
      .json(createResponse(false, "Internal server error", {}, error));
  }
};

const editRestaurant = async (req: Request, res: Response) => {
  try {
    const { restoId } = req.params;
    const { restaurant } = req.body;

    if (!restoId || !restaurant) {
      res
        .status(400)
        .json(createResponse(false, "Restaurant ID and data are required"));
    }

    const editRestaurantUseCase = new EditRestaurant(crudRepository);
    await editRestaurantUseCase.execute(restoId, restaurant);

    res
      .status(200)
      .json(createResponse(true, "Restaurant updated successfully"));
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res
      .status(500)
      .json(createResponse(false, "Internal server error", {}, error));
  }
};

const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { restoId } = req.params;

    if (!restoId) {
      res.status(400).json(createResponse(false, "Restaurant ID is required"));
    }

    const deleteRestaurantUseCase = new DeleteRestaurant(crudRepository);
    await deleteRestaurantUseCase.execute(restoId);

    res
      .status(200)
      .json(createResponse(true, "Restaurant deleted successfully"));
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res
      .status(500)
      .json(createResponse(false, "Internal server error", {}, error));
  }
};

export default {
  addRestaurant,
  fetchRestaurants,
  editRestaurant,
  deleteRestaurant,
};
