import axios from "axios";

export const getAllEntity = (body) => {
  return axios.post(`/entities/customer/search`, body);
};

export const getAllUserEntity = ({ id, formData }) => {
  return axios.post(`/entities/search/${id}`, formData);
};

export const createEntity = (formData) => {
  return axios.post(`/entities`, formData);
};

export const getEntity = (formData) => {
  return axios.get(`/entities/${formData?.id}`);
};

export const deleteEntity = (formData) => {
  return axios.delete(`/entities/${formData?.id}`);
};
