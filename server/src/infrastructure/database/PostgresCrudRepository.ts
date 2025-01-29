import Restaurant from "../../domain/entities/Restaurant.js";
import CrudRepository from "../../domain/repositories/CrudRepository.js";
import prisma from "../../orm/prismaClient.js";

class PostgresCrudRepository implements CrudRepository {
  async addRestaurant(restaurant: Restaurant): Promise<void> {
    await prisma.restuarant.create({
      data: restaurant,
    });
  }
}

export default PostgresCrudRepository;
