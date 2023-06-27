import { ChangeEvent, FC } from "react";
import style from "./style.module.css";
import useTheme from "../../../../context/Theme/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
interface props {
  media: string;
  price: number;
  title: string;
  qty: number;
}
const Row: FC<props> = ({ media, price, title, qty }) => {
  const theme = useTheme();
  const qtyChangeHandler = (event: ChangeEvent) => {
    // logic to change the quantity for this product in the cart
  };
  const deleteHandler = () => {
    // logic to delete the product from this cart
  }
  return (
    <div className={style.row} style={{ color: theme.palette.textSecondary }}>
      <img src={media} alt={title} />
      <div className={style.title}>
        <p>{title}</p>
        <p>$ {price}</p>
      </div>
      <input
        style={{
          backgroundColor: theme.palette.paper,
          border: "1px solid" + theme.palette.secondary,
          color: theme.palette.textPrimary,
        }}
        className={style.input}
        type="text"
        value={qty}
        onChange={qtyChangeHandler}
      />
      <p>$ {price * qty}</p>
      <FontAwesomeIcon
        onClick={deleteHandler}
        icon={faTrashCan}
        cursor={"pointer"}
        color={theme.palette.error}
      />
    </div>
  );
};

export default Row;
