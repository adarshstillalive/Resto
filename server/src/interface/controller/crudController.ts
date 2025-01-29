import { Request, Response } from "express";
import PostgresCrudRepository from "../../infrastructure/database/PostgresCrudRepository.js";
import AddRestaurant from "../../useCase/AddRestaurant.js";
import { createResponse } from "../../utils/createResponse.js";

const crudRepository = new PostgresCrudRepository();
const addRestaurantUseCase = new AddRestaurant(crudRepository);

const addRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurant } = req.body;
    await addRestaurantUseCase.execute(restaurant);
    res.status(201).json(createResponse(true, "Restaurant added"));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(createResponse(false, "Restaurant adding failed", {}, error));
  }
};

export default {
  addRestaurant,
};
