import { toast } from "react-toastify";
import axios from "axios";

export const extractErrorMsgFromResponse = (error: any) => {
  console.log(error, "error api");
  const errorMsg =
    error?.response?.data?.message || error?.message || "Auth Error";
  toast.error(errorMsg);
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
