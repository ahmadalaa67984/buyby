// Extend the theme to include custom colors, fonts, etc
import { extendTheme } from "@chakra-ui/react";

const colors = {
  200: "#000",
  black: "#1B2028",
  blue100: "#DBE8FF",
  primary: "#D96846",
  brand: {
    900: "#2a9ecf",
    800: "#2da0d1",
    700: "#2da0d1",
    200: "#000",
  },
  blue: {
    500: "#126890",
  },
  primaryColorScheme: {
    500: "#D96846",
  },
  secondary_green_color: "#596235",
  primary_variants: {
    200: "rgba(217, 104, 70, .1)",
    300: "rgba(217, 104, 70, .3)",
    400: "rgba(217, 104, 70, .4)",
    500: "rgba(217, 104, 70, .5)",
    600: "rgba(217, 104, 70, .6)",
    700: "rgba(217, 104, 70, .7)",
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
