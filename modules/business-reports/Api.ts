import axios from "axios";

export const getAllBusinessReports = (body) => {
  return axios.post(`/report/me/bussiness-list`, body);
};
