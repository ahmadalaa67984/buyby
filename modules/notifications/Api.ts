import axios from "axios";

export const getAllNotifications = (body) => {
  return axios.post(`/notification/search`, body);
};

export const getAllUserNotifications = (formData) => {
  return axios.post(`/notification/search/${formData?.userId}`, formData);
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
