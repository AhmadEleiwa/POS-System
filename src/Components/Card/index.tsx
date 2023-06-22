import React, { FC } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import Button from "../Button";
interface props {
  title: string;
  unitOfMeasure: string;
  category: string;
  media: string;
  className?: string;
}
const Card: FC<props> = ({
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
      className={style.card + " " + className}
      style={{ backgroundColor: theme.palette.paper }}
    >
      <div className={style.cardMedia}>
        <img src={media} />
        <Button
          variant="secondary"
          size="large"
          onClick={() => addHandler}
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
