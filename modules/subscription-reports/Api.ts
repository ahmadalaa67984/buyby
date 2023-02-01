import axios from "axios";

export const getSubReportsDTD = (body) => {
  return axios.post(`/report/me/dtd-subscription`, body);
};

export const getSubReportsWTW = (body) => {
  return axios.post(`/report/me/wtw-subscription`, body);
};

export const getSubReportsMTM = (body) => {
  return axios.post(`/report/me/mtm-subscription`, body);
};

export const getSubReportsYTY = (body) => {
  return axios.post(`/report/me/yty-subscription`, body);
};
