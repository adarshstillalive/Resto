import { Request, Response } from "express";
import PostgresCrudRepository from "../../infrastructure/database/PostgresCrudRepository.js";
import AddRestaurant from "../../useCase/AddRestaurant.js";
import { createResponse } from "../../utils/createResponse.js";
import FetchRestaurants from "../../useCase/FetchRestaurants.js";
import EditRestaurant from "../../useCase/EditRestaurant.js";

const crudRepository = new PostgresCrudRepository();

const addRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurant } = req.body;
    const addRestaurantUseCase = new AddRestaurant(crudRepository);
    await addRestaurantUseCase.execute(restaurant);
    res.status(201).json(createResponse(true, "Restaurant added"));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(createResponse(false, "Restaurant adding failed", {}, error));
  }
};

const fetchRestaurants = async (req: Request, res: Response) => {
  try {
    const fetchRestaurantsUseCase = new FetchRestaurants(crudRepository);
    const resturants = await fetchRestaurantsUseCase.execute();
    res
      .status(200)
      .json(
        createResponse(true, "Restaurants fetched successfully", resturants)
      );
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(
        createResponse(false, "Fetching restaurant data failed", {}, error)
      );
  }
};

const editRestaurant = async (req: Request, res: Response) => {
  try {
    const { restoId } = req.params;
    const { restaurant } = req.body;
    const editRestaurantUseCase = new EditRestaurant(crudRepository);
    await editRestaurantUseCase.execute(restoId, restaurant);
    res
      .status(200)
      .json(createResponse(true, "Restaurant data edited successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(createResponse(false, "Editing restaurant data failed", {}, error));
  }
};

const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { restoId } = req.params;
    const editRestaurantUseCase = new EditRestaurant(crudRepository);
    await editRestaurantUseCase.execute(restoId, restaurant);
    res.status(200).json(createResponse(true, "Restaurant data deleted"));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(
        createResponse(false, "deleting restaurant data failed", {}, error)
      );
  }
};

export default {
  addRestaurant,
  fetchRestaurants,
  editRestaurant,
  deleteRestaurant,
};
