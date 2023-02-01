import axios from "axios";

export const getAllNotifications = (body) => {
  return axios.post(`/notification/search`, body);
};

export const getAllUserNotifications = ({ id, formData }) => {
  return axios.post(`/notification/search/${id}`, formData);
};

export const createNotification = (formData) => {
  return axios.post(`/notification`, formData);
};

export const getNotification = (formData) => {
  return axios.get(`/notification/${formData?.id}`);
};

export const deleteNotification = (formData) => {
  return axios.delete(`/notification/${formData?.id}`);
};
