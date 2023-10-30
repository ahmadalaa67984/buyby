import axios from "axios";

export const getAllStockitem = (body) => {
  return axios.post(`/stock-item-data/customer/search`, body);
};

export const getAllUserStockitem = ({ id, formData }) => {
  return axios.post(`/stockitem/search/${id}`, formData);
};

export const createStockitem = (formData) => {
  return axios.post(`/stockitem`, formData);
};

export const getStockitem = (formData) => {
  return axios.get(`/stockitem/${formData?.id}`);
};

export const deleteStockitem = (formData) => {
  return axios.delete(`/stockitem/${formData?.id}`);
};
