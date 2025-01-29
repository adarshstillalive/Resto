import Restaurant from "../../domain/entities/Restaurant.js";
import CrudRepository from "../../domain/repositories/CrudRepository.js";
import prisma from "../../orm/prismaClient.js";

class PostgresCrudRepository implements CrudRepository {
  async addRestaurant(restaurant: Restaurant): Promise<void> {
    await prisma.restuarant.create({
      data: restaurant,
    });
  }

  async fetchRestuarants(): Promise<Restaurant[]> {
    const resturants = await prisma.restuarant.findMany();
    if (!resturants) {
      throw new Error("DB error");
    }
    return resturants;
  }
}

export default PostgresCrudRepository;
