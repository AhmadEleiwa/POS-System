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
import { useDispatch } from "react-redux";
import { chooseCart } from "../../store/Actions";
interface props {
  width?: string;
}
const Aside: FC<props> = ({ width }) => {
  const [show, setShow] = useState<string>("");
  const [showContainer, setShowContainer] = useState<boolean>(true);
  const theme = useTheme();
  const dispatch = useDispatch();
  const chooseOrderHandler = (id: string) => {
    dispatch(chooseCart(id));
    setShow(id);
  };
  const removeOrderHandler = () => {
    setShow("");
    dispatch(chooseCart(""));
  };
  console.log(showContainer);
  return (
    <div className={style.main}>
      <FontAwesomeIcon
        className={style.arrowLeft}
        icon={faArrowLeftLong}
        color={theme.palette.textPrimary}
        onClick={() => setShowContainer(true)}
      />
      <div
        className={style.container}
        style={{
          backgroundColor: theme.palette.paper,
          boxShadow: " 0 2px 4px" + theme.palette.shadow,
          width: showContainer ? "100%" : "0%",
        }}
        onBlur={() => setShowContainer(false)}
      >
        <FontAwesomeIcon
          className={style.arrowRight}
          icon={faArrowRightLong}
          color={theme.palette.textPrimary}
          onClick={() => setShowContainer(false)}
        />
        {show === "" ? (
          <CartTable onChoose={chooseOrderHandler} />
        ) : (
          <SingleCart
            onRemoveOrder={removeOrderHandler}
            orderId={show}
            onClick={() => setShow("")}
          />
        )}
      </div>
    </div>
  );
};

export default Aside;
