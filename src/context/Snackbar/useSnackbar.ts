import { useContext } from "react";
import { context } from "./SnackProvider";

const useSnackbar = () => useContext(context);
export default useSnackbar;
