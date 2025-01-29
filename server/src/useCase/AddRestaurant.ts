import Restaurant from "../domain/entities/Restaurant.js";
import CrudRepository from "../domain/repositories/CrudRepository.js";

class AddRestaurant {
  constructor(private crudRepository: CrudRepository) {}

  async execute(restaurant: Restaurant): Promise<void> {
    await this.crudRepository.addRestaurant(restaurant);
  }
}

export default AddRestaurant;
