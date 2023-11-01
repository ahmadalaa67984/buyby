import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { store } from "../services/configureStore";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra.config";
import CRtlProvider from "../components/translations/CRtl-Provider";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

axios.defaults.baseURL = process.env.BACKEND_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
  "token"
)}`;

export default function App({ Component, pageProps }: AppProps) {
  console.log(process.env.BACKEND_URL, "BACKEND_URL");
  const [showChild, setShowChild] = useState(false);
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.error(error, "error");
      if (
        error?.response?.status === 401 &&
        !window.location.pathname.includes("/auth")
      ) {
        Cookies.remove("token");

        window.location.href = `/auth/signin`;
        return Promise.reject(error);
      } else if (error?.response?.status > 499) {
        // window.location.href = `/${router.locale}/500`;
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <CRtlProvider>
          {<Component {...pageProps} />}
          <ToastContainer
            position='top-right'
            autoClose={7000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </CRtlProvider>
      </ChakraProvider>
    </Provider>
  );
}
