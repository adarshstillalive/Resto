import Restaurant from "../../domain/entities/Restaurant.js";
import CrudRepository from "../../domain/repositories/CrudRepository.js";
import prisma from "../../orm/prismaClient.js";

class PostgresCrudRepository implements CrudRepository {
  async addRestaurant(restaurant: Restaurant): Promise<void> {
    await prisma.restaurant.create({
      data: restaurant,
    });
  }

  async fetchRestaurants(): Promise<Restaurant[]> {
    const restaurants = await prisma.restaurant.findMany();
    if (!restaurants) {
      throw new Error("DB error");
    }
    return restaurants;
  }

  async editRestaurant(restoId: string, restaurant: Restaurant): Promise<void> {
    await prisma.restaurant.update({
      where: { restoId },
      data: { ...restaurant },
    });
  }
}

export default PostgresCrudRepository;
