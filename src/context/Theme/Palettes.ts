/**
 * Palette is type to describe the main colors of the site
 */
type Palette = {
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  white: string;
  textPrimary: string;
  textSecondary: string;
};

const primaryTheme: Palette = {
  primary: "#8CAEDE",
  secondary: "#8DC6EF",
  error: "#B00020",
  white: "F1F1F1",
  warning: "#FFCC00",
  textPrimary: "#000000",
  textSecondary: "#414141",
};
export type keys = "primary" | "green";

export const palettes: Record<keys, Palette> = {
  primary: primaryTheme,
  green: primaryTheme,
};

export default Palette;
