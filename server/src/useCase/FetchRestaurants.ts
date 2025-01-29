import Restaurant from "../domain/entities/Restaurant.js";
import CrudRepository from "../domain/repositories/CrudRepository.js";

class FetchRestaurants {
  constructor(private crudRepository: CrudRepository) {}

  async execute(): Promise<Restaurant[]> {
    return await this.crudRepository.fetchRestuarants();
  }
}

export default FetchRestaurants;
