import axios from "axios";

export const getAllSystemLogs = (body) => {
  return axios.post(`/sys-log/search`, body);
};

export const getSystemLog = (formData) => {
  return axios.get(`/sys-log/${formData?.id}`);
};

export const deleteSystemLog = (formData) => {
  return axios.delete(`/sys-log/${formData?.id}`);
};
