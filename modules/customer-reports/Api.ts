import axios from "axios";

export const getAllCustomerReports = (body) => {
  return axios.post(`/report/me/customers-list`, body);
};
