import { useContext } from "react";
import { context } from "./ThemeProvider";

const useTheme = useContext(context);
export default useTheme;
