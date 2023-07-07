import { FC, MouseEventHandler } from "react";
import style from "./style.module.css";
import useTheme from "../../../../context/Theme/useTheme";
interface props extends UnitOfMeasure{
    onClick:MouseEventHandler;
}
const Row: FC<props> = ({
  unitOfMeasureName,
  baseUnitOfMeasure,
  conversionFactor,
  onClick
}) => {
  const theme = useTheme();
  return (
    <div
      className={style.row}
      style={{
        backgroundColor: theme.palette.paper,
        color:theme.palette.textPrimary
      }}
      onClick={onClick}
    >
      <p>{unitOfMeasureName}</p>
      <p>{baseUnitOfMeasure}</p>
      <p>{conversionFactor}</p>
    </div>
  );
};
export default Row;
