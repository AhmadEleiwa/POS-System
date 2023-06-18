import { FC, PropsWithChildren, createContext, useState } from "react";
import Palette, { keys, palettes } from "./Palettes";

type ProviderValues = {
  palette: Palette;
  changePalette?: (mode: keys) => void;
};

export const context = createContext<ProviderValues>({
  palette: palettes.primary,
});

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [paletteKey, setPaletteKey] = useState<keys>("primary");
  const changePalette = (mode: keys) => {
    setPaletteKey(mode);
  };
  return (
    <context.Provider
      value={{ palette: palettes[paletteKey], changePalette: changePalette }}
    >
      {children}
    </context.Provider>
  );
};

export default ThemeProvider;
