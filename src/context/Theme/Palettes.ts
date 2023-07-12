/**
 * Palette is type to describe the main colors of the site
 */
type Palette = {
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  paper: string;
  textAction: string;
  textPrimary: string;
  textSecondary: string;
  background: string;
  shadow:string;
  success:string;
};

const primaryTheme: Palette = {
  primary: "#8CAEDE",
  secondary: "#8DC6EF",
  error: "#B00020",
  paper: "#fefefe",
  warning: "#FFCC00",
  textPrimary: "#000000",
  textSecondary: "#414141",
  textAction: "white",
  background: "#f1f1f1",
  shadow:'#66666666',
  success:'#4BB543'
};
const darkTheme: Palette = {
  primary: "#121212",
  secondary: "#2f2f2f",
  error: "#B00020",
  paper: "#121212",
  warning: "#CC9900",
  textPrimary: "#fff",
  textSecondary: "#afafaf",
  textAction: "white",
  background: "#1f1f1f",
  shadow:'#01010166',
  success:'#4BB543'
};

const greenTheme: Palette = {
  primary: "#7FB77E",
  secondary: "#B1D7B4",
  error: "#B00020",
  paper: "#fefefe",
  warning: "#FFCC00",
  textAction: "white",
  textPrimary: "#000000",
  textSecondary: "#414141",
  background: "#EBFDEE",
  shadow:'#66666666',
  success:'#4BB543'
};

const matrialTheme: Palette = {
  primary: "#27374D",
  secondary: "#435B66",
  error: "#900020",
  paper: "#27374D",
  warning: "#ccaa00",
  textAction: "white",
  textPrimary: "#ffffff",
  textSecondary: "#cfcfcf",
  background: "#2D4356",
  shadow:'#12121288',
  success:'#4BB543'
};
export type keys = "primary" | "green" | "dark" | "matrial";

export const palettes: Record<keys, Palette> = {
  primary: primaryTheme,
  green: greenTheme,
  dark: darkTheme,
  matrial:matrialTheme
};

export default Palette;
