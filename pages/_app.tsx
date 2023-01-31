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

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
  "token"
)}`;

export default function App({ Component, pageProps }: AppProps) {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL, "BACKEND_URL");

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <CRtlProvider>
          <Component {...pageProps} />
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
