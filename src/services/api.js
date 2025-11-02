import axios from "axios";
export const API = axios.create({
  baseURL: "https://farmtotablegameserver-production.up.railway.app/api",
});
