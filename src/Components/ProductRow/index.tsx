import React, { FC, MouseEventHandler } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
interface props {
  title: string;
  unitOfMeasure: string;
  category: string;
  media: string;
  className?: string;
  onClick?: MouseEventHandler;
  width?: string;
  borderRadius?: string;
}
const ProductRow: FC<props> = ({
  title,
  unitOfMeasure,
  category,
  media,
  className,
  width,
  onClick,
  borderRadius = "4px",
}) => {
  const theme = useTheme();
  return (
    <div
      className={style.row + " " + className}
      style={{
        backgroundColor: theme.palette.paper,
        width: width,
        borderRadius: borderRadius,
      }}
      onClick={onClick}
    >
      <img src={media} alt="" />
      <p style={{ color: theme.palette.textPrimary }}>{title}</p>
      <p style={{ color: theme.palette.textSecondary }}>{unitOfMeasure}</p>
      <p style={{ color: theme.palette.textSecondary }}>{category}</p>
    </div>
  );
};

export default ProductRow;
