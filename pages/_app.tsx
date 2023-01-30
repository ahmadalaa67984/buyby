import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../services/configureStore";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra.config";
import CRtlProvider from "../components/translations/CRtl-Provider";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjExYzcwODQ5ZjIxMzQ1NWY4ODlmMyIsImlhdCI6MTY3NTA4OTI5MCwiZXhwIjoxNjc3NjgxMjkwfQ.S2FC0zs7qzNKBAp2Vwa_psx1ytb7xwmQ4GJud9p1T7U";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default function App({ Component, pageProps }: AppProps) {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL, "BACKEND_URL");

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <CRtlProvider>
          <Component {...pageProps} />
        </CRtlProvider>
      </ChakraProvider>
    </Provider>
  );
}
