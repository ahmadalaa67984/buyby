import en from "./en.json";
import ar from "./ar.json";
import fr from "./fr.json";
import { useRouter } from "next/router";

const useTranslation = () => {
  const { locale } = useRouter();

  const Translate = (word: any) => {
    if (locale?.toLowerCase().includes("en")) return en[word];
    else if (locale?.toLowerCase().includes("fr")) return fr[word];
    else return ar[word];
  };

  return { Translate, locale };
};
export default useTranslation;
