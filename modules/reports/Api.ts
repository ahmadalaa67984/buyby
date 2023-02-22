import axios from "axios";

export const getLogsReports = (body) => {
  return axios.post(`/report/me/logs-list`, body);
};

export const getSubscriptionsReports = (body) => {
  return axios.post(`/report/me/subscription`, body);
};
