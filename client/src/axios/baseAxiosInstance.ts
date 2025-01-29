import axios from "axios";

const baseAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export default baseAxiosInstance;
