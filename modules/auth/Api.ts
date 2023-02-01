import axios from "axios";

export const signin = (formData) => {
  formData.email = formData?.email?.toLowerCase();
  return axios.post("/auth/signin", formData);
};

export const signout = () => {
  return axios.get("/auth/logout");
};

export const forgotPassword = (formData) => {
  return axios.post("/auth/forgot-password", formData);
};

export const resetPassword = (formData) => {
  return axios.post("/auth/reset-password", formData);
};

export const resendVerifyCode = (formData) => {
  return axios.post("/auth/send-reverify-email", formData);
};
