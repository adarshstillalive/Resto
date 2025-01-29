import baseAxiosInstance from "../axios/baseAxiosInstance";
import { IRestaurant } from "../interface/IRestaurant";

export const fetchRestaurantsApi = async () => {
  const response = await baseAxiosInstance.get("/restaurant");
  return response.data;
};

export const addRestaurantApi = async (restaurant: IRestaurant) => {
  const response = await baseAxiosInstance.post("/restaurant", { restaurant });
  return response.data;
};

export const editRestaurantApi = async (
  restoId: string,
  restaurant: IRestaurant
) => {
  const response = await baseAxiosInstance.put(`/restaurant/${restoId}`, {
    restaurant,
  });
  return response.data;
};

export const deleteRestaurantApi = async (restoId: string) => {
  const response = await baseAxiosInstance.delete(`/restaurant/${restoId}`);
  return response.data;
};
