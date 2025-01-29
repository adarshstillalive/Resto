import Restaurant from "../entities/Restaurant.js";

interface CrudRepository {
  addRestaurant(restaurant: Restaurant): Promise<void>;
  fetchRestuarants(): Promise<Restaurant[]>;
}

export default CrudRepository;
