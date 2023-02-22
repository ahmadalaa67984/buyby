import { toast } from "react-toastify";
import axios from "axios";
import { getErrorMsgFromErrorCode } from "./errorMsgFromErrorCode";

export const extractErrorMsgFromResponse = (error: any) => {
  console.log(error, "error api");
  const errorMsg =
    getErrorMsgFromErrorCode(error) ||
    error?.response?.data?.message ||
    error?.message ||
    "Auth Error";
  toast.error(errorMsg, { toastId: "error-msg" });
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
