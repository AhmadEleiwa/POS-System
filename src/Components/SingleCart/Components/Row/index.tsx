import { ChangeEvent, ChangeEventHandler, FC } from "react";
import style from "./style.module.css";
import useTheme from "../../../../context/Theme/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../../../store/Reducers";
interface props {
  id: string;
  media: string;
  price: number;
  title: string;
  qty: number;
  unitOfMeasure: string;
  onQTYChange: (value: string, id: string) => void;
  onDelete: (id: string) => void;
}
const Row: FC<props> = ({ id, media, price, title, qty,unitOfMeasure, onQTYChange,onDelete }) => {
  const theme = useTheme();
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onQTYChange(event.target.value, id);
  };
  return (
    <div className={style.row} style={{ color: theme.palette.textSecondary }}>
      <img src={media} alt={title} />
      <div className={style.title}>
        <p>{title } <small>{unitOfMeasure}</small></p>
        <small>$ {price}</small>
      </div>
      <input
        style={{
          backgroundColor: theme.palette.paper,
          border: "1px solid" + theme.palette.secondary,
          color: theme.palette.textPrimary,
        }}
        className={style.input}
        type="number"
        min={1}
        max={99}
        value={qty}
        onChange={onChangeHandler}
      />
      <p>$ {(price * qty).toFixed(2)}</p>
      <FontAwesomeIcon
        onClick={()=>onDelete(id)}
        icon={faTrashCan}
        cursor={"pointer"}
        color={theme.palette.error}
      />
    </div>
  );
};

export default Row;
