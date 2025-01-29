import Restaurant from "../domain/entities/Restaurant.js";
import CrudRepository from "../domain/repositories/CrudRepository.js";

class EditRestaurant {
  constructor(private crudRepository: CrudRepository) {}

  async execute(restoId: string, restaurant: Restaurant): Promise<void> {
    await this.crudRepository.editRestaurant(restoId, restaurant);
  }
}

export default EditRestaurant;
