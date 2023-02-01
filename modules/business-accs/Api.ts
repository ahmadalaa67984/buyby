import axios from "axios";

export const getAllBusinessAccs = (body) => {
  return axios.post(`/users/search`, body);
};

export const getUserById = (formData) => {
  return axios.get(`/users/find/${formData?.id}`);
};
