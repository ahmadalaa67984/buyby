// Extend the theme to include custom colors, fonts, etc
import { extendTheme } from "@chakra-ui/react";

const colors = {
  200: "#000",
  black: "#1B2028",
  blue100: "#DBE8FF",
  primary: "#5211A5",
  secondary: "#3A2752",
  brand: {
    900: "#2a9ecf",
    800: "#2da0d1",
    700: "#2da0d1",
    200: "#000",
  },
  blue: {
    500: "#3A2752",
  },
  primaryColorScheme: {
    500: "#5211A5",
  },
  secondary_green_color: "#596235",
  primary_variants: {
    100: "rgba(82, 17, 165, .1)",
    200: "rgba(82, 17, 165, .2)",
    300: "rgba(82, 17, 165, .3)",
    400: "rgba(82, 17, 165, .4)",
    500: "rgba(82, 17, 165, .5)",
    600: "rgba(82, 17, 165, .6)",
    700: "rgba(82, 17, 165, .7)",
  },
  secondary_variants: {
    200: "rgba(58, 39, 82, .2)",
    300: "rgba(58, 39, 82, .3)",
    400: "rgba(58, 39, 82, .4)",
    500: "rgba(58, 39, 82, .5)",
    600: "rgba(58, 39, 82, .6)",
    700: "rgba(58, 39, 82, .7)",
  },
};

// screens -> 800: '', 1024: '', 1280: '', 1366: '', 1440: '', 1512: '', 1680: '', 1792: '', 1920: '', 2560: ''
const breakpoints = {
  800: "800px",
  1024: "1024px",
  1280: "1280px",
  1366: "1366px",
  1440: "1440px",
  1512: "1512px",
  1680: "1680px",
  1792: "1792px",
  1920: "1920px",
  2560: "2560px",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

export const theme = extendTheme({
  colors,
  breakpoints,
});
