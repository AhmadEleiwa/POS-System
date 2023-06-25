import React, { FC } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
interface props {
  title: string;
  unitOfMeasure: string;
  category: string;
  media: string;
  className?: string;
}
const ProductRow: FC<props> = ({
  title,
  unitOfMeasure,
  category,
  media,
  className,
}) => {
  const theme = useTheme();
  const addHandler = () => {
    // some logic to handle the adding to order
  };
  return (
    <div
      className={style.row}
      style={{ backgroundColor: theme.palette.paper }}
      onClick={addHandler}
    >
      <img src={media} alt="" />
      <p style={{ color: theme.palette.textPrimary }}>{title}</p>
      <p style={{ color: theme.palette.textSecondary }}>{unitOfMeasure}</p>
      <p style={{ color: theme.palette.textSecondary }}>{category}</p>
    </div>
  );
};

export default ProductRow;
