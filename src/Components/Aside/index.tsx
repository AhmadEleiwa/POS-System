import { FC, useState } from "react";
import CartTable from "../CartTable";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import SingleCart from "../SingleCart";
interface props {
  width?: string;
}
const Aside: FC<props> = ({ width }) => {
  const [show, setShow] = useState<string>("");
  const theme = useTheme();
  const chooseOrderHandler = (id: string) => {
    setShow(id);
  };
  return (
    <div
      className={style.container}
      style={{
        backgroundColor: theme.palette.paper,
        width: width,
        boxShadow: " 0 2px 4px" + theme.palette.shadow,
      }}
    >
      {show === "" ? (
        <CartTable onChoose={chooseOrderHandler} />
      ) : (
        <SingleCart orderId={show} onClick={() => setShow("")} />
      )}
    </div>
  );
};

export default Aside;
