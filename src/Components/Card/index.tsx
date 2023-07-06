import React, { FC } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Reducers";
import { addProduct, addProductToCart } from "../../store/Actions";
interface props {
  title: string;
  unitOfMeasure: string;
  category: string;
  media: string;
  id: string;
  className?: string;
}
const Card: FC<props> = ({
  title,
  unitOfMeasure,
  category,
  media,
  id,
  className,
}) => {
  const theme = useTheme();
  const cartId = useSelector<RootState>(
    (state) => state.selectedCartReducer
  ) as string;
  const products =   useSelector<RootState>((state) => state.productsReducer) as Product[]
  
  const dispatch = useDispatch();
  const addHandler = () => {
    // some logic to handle the adding to order
    let isFound = products.find(p => p.id == id)
    if(isFound)
      dispatch(addProductToCart(cartId, isFound));
  };
  return (
    <div
      className={style.card + " " + className}
      style={{
        backgroundColor: theme.palette.paper,
        boxShadow: `0 2px 6px ${theme.palette.shadow}`,
      }}
    >
      <div className={style.cardMedia}>
        <img src={media} />
        <Button
          variant="primary"
          size="large"
          onClick={addHandler}
          className={style.buttonAdd}
        >
          Add
        </Button>
      </div>
      <div className={style.cardBody}>
        <div className={style.title}>
          <p style={{ color: theme.palette.textPrimary }}>{title}</p>.
          <p style={{ color: theme.palette.textSecondary }}>{unitOfMeasure}</p>
        </div>
        <div className={style.category}>
          <p style={{ color: theme.palette.textSecondary }}>Category</p>
          <span
            className={style.categoryCeil}
            style={{
              backgroundColor: theme.palette.secondary,
              color: theme.palette.textAction,
            }}
          >
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
