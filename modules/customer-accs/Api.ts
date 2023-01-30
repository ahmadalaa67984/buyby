import axios from "axios";

export const getAllCustomers = (body) => {
  return axios.post(`/users/search`, body);
};

export const createCustomer = (formData) => {
  return axios.post(`/customer/me/create`, formData);
};

export const updateCustomer = (formData) => {
  return axios.patch(`/customer/me/update/${formData?.id}`, formData);
};

export const getCustomer = (formData) => {
  return axios.get(`/customer/me/findOne/${formData?.id}`);
};

export const applyRecievePromotion = (formData) => {
  return axios.patch(
    `users/update-promotional-messages-discounts/${formData?.id}`,
    formData
  );
};
