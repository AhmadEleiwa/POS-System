import { FC, useState } from "react";
import CartTable from "../CartTable";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import SingleCart from "../SingleCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
interface props {
  width?: string;
}
const Aside: FC<props> = ({ width }) => {
  const [show, setShow] = useState<string>("");
  const [showContainer, setShowContainer] = useState<boolean>(true)
  const theme = useTheme();
  const chooseOrderHandler = (id: string) => {
    setShow(id);
  };
  const removeOrderHandler = () => {
    setShow("")
  }
  return (
    <div
      className={style.container}
      style={{
        backgroundColor: theme.palette.paper,
        width: width,
        boxShadow: " 0 2px 4px" + theme.palette.shadow,
        right:showContainer ? 0: '-100%' 
      }}
      onBlur={()=>setShowContainer(false)}
    >
      <FontAwesomeIcon
        className={style.arrowLeft}
        icon={faArrowLeftLong}
        color={theme.palette.textPrimary}
        onClick={()=>setShowContainer(true)}
      />
        <FontAwesomeIcon
        className={style.arrowRight}
        icon={faArrowRightLong}
        color={theme.palette.textPrimary}
        onClick={()=>setShowContainer(false)}
      />
      {show === "" ? (
        <CartTable onChoose={chooseOrderHandler} />
      ) : (
        <SingleCart onRemoveOrder={removeOrderHandler} orderId={show} onClick={() => setShow("")} />
      )}
    </div>
  );
};

export default Aside;
