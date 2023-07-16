import { FC, useEffect, useRef } from "react";
import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import useTheme from "../../context/Theme/useTheme";
interface props {
  response: ResponseResult;
  onClose: () => void;
}
const Snackbar: FC<props> = ({ response, onClose }) => {
  const theme = useTheme();
  const snackbar = useRef<HTMLDivElement>(null);
  let color = theme.palette.success;
  if (response.status >= 300 && response.status < 400) {
    color = theme.palette.warning;
  } else if (response.status >= 400) {
    color = theme.palette.error;
  }
  useEffect(() => {
    setTimeout(() => {
      if (snackbar.current) snackbar.current.style.opacity = "0.9";
    }, 0);
  }, [response]);

  return (
    <>
      {response.message && (
        <div
          ref={snackbar}
          className={style.snackbar}
          style={{
            backgroundColor: theme.palette.paper,
            boxShadow: "0 2px 8px" + theme.palette.shadow,
            color: theme.palette.textPrimary,
          }}
        >
          <FontAwesomeIcon
            data-testid="close-icon"
            className={style.xIcon}
            icon={faX}
            cursor={"pointer"}
            onClick={onClose}
          />
          <div className={style.message}>{response.message}</div>
          <div
            className={style.status}
            style={{ backgroundColor: color, color: theme.palette.textAction }}
          >
            {response.status}
          </div>
        </div>
      )}
    </>
  );
};
export default Snackbar;
