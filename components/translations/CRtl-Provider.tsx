import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useRouter } from "next/router";
import rtl from "stylis-plugin-rtl";
const options = {
  rtl: { key: "css-ar", stylisPlugins: [rtl as any] },
  ltr: { key: "css-en" },
};

const CRtlProvider = ({ children }) => {
  const { locale } = useRouter();
  const dir = locale == "ar" ? "rtl" : "ltr";
  const cache = createCache(options[dir]);
  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default CRtlProvider;
