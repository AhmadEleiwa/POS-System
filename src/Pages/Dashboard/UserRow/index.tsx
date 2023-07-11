import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, MouseEventHandler } from "react";
import useTheme from "../../../context/Theme/useTheme";
import style from './style.module.css'
interface props {
  username: string;
  isAdmin: boolean;
  onClick: MouseEventHandler;
}
const UserRow: FC<props> = ({ username,isAdmin ,onClick}) => {
    const theme = useTheme()
  return (
    <div
      className={style.row}
      style={{
        backgroundColor: theme.palette.paper,
      }}
    >
      <p>{username}</p>
      <p>{isAdmin ? "Admin" : 'User'}</p>
      <FontAwesomeIcon icon={faTrashCan} cursor={'pointer'} onClick={onClick} />
    </div>
  );
};
export default UserRow;
