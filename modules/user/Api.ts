import axios from "axios";

export const getUser = () => {
  return axios.get("/users/me");
};

export const getProfile = () => {
  return axios.get("/restaurants/me");
};
