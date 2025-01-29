import Restaurant from "../entities/Restaurant.js";

interface CrudRepository {
  addRestaurant(restaurant: Restaurant): Promise<void>;
  fetchRestaurants(): Promise<Restaurant[]>;
  editRestaurant(restoId: string, restaurant: Restaurant): Promise<void>;
  deleteRestaurant(restoId: string): Promise<void>;
}

export default CrudRepository;
