import React, { FC, MouseEventHandler } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux";
import { addProductToCart } from "../../store/Actions";
import { RootState } from "../../store/Reducers";
interface props {
  title: string;
  unitOfMeasure: string;
  category: string;
  media: string;
  price:number;
  className?: string;
  onClick?: MouseEventHandler;
  width?: string;
  id?:string;
  borderRadius?: string;
}
const ProductRow: FC<props> = ({
  title,
  unitOfMeasure,
  category,
  media,
  price,
  className,
  width,
  onClick,
  id,
  borderRadius = "4px",
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const cartId = useSelector<RootState>(
    (state) => state.selectedCartReducer
  ) as string;
  const products = useSelector<RootState>(
    (state) => state.productsReducer
  ) as Product[];
  const addHandler = () => {
    // some logic to handle the adding to order
    let isFound = products.find((p) => p.id === id);
    if (isFound) dispatch(addProductToCart(cartId, isFound));
  };
  return (
    <div
      className={style.row + " " + className}
      style={{
        backgroundColor: theme.palette.paper,
        width: width,
        borderRadius: borderRadius,
      }}
      onClick={onClick ? onClick : addHandler}
    >
      <img src={media} alt="" />
      <p style={{ color: theme.palette.textPrimary }}>{price}</p>
      <p style={{ color: theme.palette.textPrimary }}>{title}</p>
      <p style={{ color: theme.palette.textSecondary }}>{unitOfMeasure}</p>
      <p style={{ color: theme.palette.textSecondary }}>{category}</p>
    </div>
  );
};

export default ProductRow;
