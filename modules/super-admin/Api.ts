import axios from "axios";

export const getAllSuperAdmins = (body) => {
  return axios.post(`/users/search`, body);
};

export const createSuperAdmin = (formData) => {
  return axios.post(`/users/create`, formData);
};

export const activateUser = (formData) => {
  return axios.post(`/users/deactive/${formData?._id}`, formData);
};
