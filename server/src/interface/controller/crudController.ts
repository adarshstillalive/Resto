import { Request, Response } from "express";
import PostgresCrudRepository from "../../infrastructure/database/PostgresCrudRepository.js";
import AddRestaurant from "../../useCase/AddRestaurant.js";
import { createResponse } from "../../utils/createResponse.js";
import FetchRestaurants from "../../useCase/FetchRestaurants.js";

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
    const fetchRestuarantsUseCase = new FetchRestaurants(crudRepository);
    const resturants = await fetchRestuarantsUseCase.execute();
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

export default {
  addRestaurant,
  fetchRestaurants,
};
