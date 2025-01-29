import CrudRepository from "../domain/repositories/CrudRepository.js";

class DeleteRestaurant {
  constructor(private crudRepository: CrudRepository) {}

  async execute(restoId: string): Promise<void> {
    await this.crudRepository.deleteRestaurant(restoId);
  }
}

export default DeleteRestaurant;
