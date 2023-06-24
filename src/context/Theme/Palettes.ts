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
};
const darkTheme: Palette = {
  primary: "#121212",
  secondary: "#2f2f2f",
  error: "#B00020",
  paper: "#121212",
  warning: "#FFCC00",
  textPrimary: "#fff",
  textSecondary: "#afafaf",
  textAction: "white",
  background: "#2f2f2f",
};

const greenTheme: Palette = {
  primary: "#7FB77E",
  secondary: "#B1D7B4",
  error: "#B00020",
  paper: "#F1F1F1",
  warning: "#FFCC00",
  textAction: "white",
  textPrimary: "#000000",
  textSecondary: "#414141",
  background: "#EBFDEE",
};
export type keys = "primary" | "green" | "dark";

export const palettes: Record<keys, Palette> = {
  primary: primaryTheme,
  green: greenTheme,
  dark: darkTheme,
};

export default Palette;
