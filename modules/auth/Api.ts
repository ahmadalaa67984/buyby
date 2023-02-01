import axios from "axios";

export const signin = (formData) => {
  formData.email = formData?.email?.toLowerCase();
  return axios.post("/auth/signin", formData);
};

export const signout = () => {
  return axios.get("/auth/logout");
};

export const resetPassword = (formData) => {
  return axios.post("/auth/reset-password", formData);
};
