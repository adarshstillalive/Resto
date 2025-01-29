import Restaurant from "../entities/Restaurant.js";

interface CrudRepository {
  addRestaurant(restaurant: Restaurant): Promise<void>;
}

export default CrudRepository;
