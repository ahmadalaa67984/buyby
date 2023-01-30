import axios from "axios";

export const getAllBusinessAccs = (body) => {
  return axios.post(`/users/search`, body);
};
