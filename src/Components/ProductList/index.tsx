import React, { ChangeEvent, FC, useState } from "react";
import Card from "../Card";
import style from "./style.module.css";
import SearchField from "../SearchField";
import useTheme from "../../context/Theme/useTheme";
import Select from "../Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells, faTableList } from "@fortawesome/free-solid-svg-icons";
import ProductRow from "../ProductRow";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Reducers";

const ProductList: FC = () => {
  const productsReducer = useSelector<RootState>(
    (state) => state.productsReducer
  ) as Product[];
  const categories = useSelector<RootState>(
    (state) => state.categoriessReducer
  ) as Category[];
  const unitOfMeasures = useSelector<RootState>(
    (state) => state.unitOfMeasureReducer
  ) as UnitOfMeasure[];
  const theme = useTheme();
  const [searchValue, setSearcchValue] = useState("");
  const [displayWay, setDisplayWay] = useState<string>("grid");
  const [filters, setFilters] = useState({
    category: "all",
    unitOfMeasure: "all",
  });

  // Search filters applied when the search value changed or the filtersValues changed
  let items: Product[] = [...productsReducer].filter(
    (p) =>
      (filters.category === "all"
        ? true
        : p.category.categoryName === filters.category) &&
      (filters.unitOfMeasure === "all"
        ? true
        : p.unitOfMeasure.unitOfMeasureName === filters.unitOfMeasure) &&
      (p.category.categoryName === searchValue ||
        p.title.startsWith(searchValue) ||
        (p.title + " " + p.unitOfMeasure).startsWith(searchValue) ||
        p.unitOfMeasure.unitOfMeasureName.startsWith(searchValue))
  );
  const searchHandler = (value: string) => {
    setSearcchValue(value);
  };
  const onChangeCategoryFilterHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters((p) => {
      return { ...p, category: event.target.value };
    });
  };

  const onChangeUnitOfMeasureFilterHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters((p) => {
      return { ...p, unitOfMeasure: event.target.value };
    });
  };

  const displayWayHandler = (status: string) => {
    setDisplayWay(status);
  };
  return (
    <div className={style.container}>
      <div className={style.head}>
        <h1 style={{ color: theme.palette.textPrimary }}>EMMARKET</h1>
        <SearchField className={style.searchBar} onChange={searchHandler} />
      </div>
      <div className={style.controls}>
        <FontAwesomeIcon
          onClick={() => displayWayHandler("grid")}
          icon={faTableCells}
          cursor={"pointer"}
          color={theme.palette.textSecondary}
          fontSize={30}
        />
        <FontAwesomeIcon
          onClick={() => displayWayHandler("list")}
          icon={faTableList}
          cursor={"pointer"}
          color={theme.palette.textSecondary}
          fontSize={30}
        />
        <Select
          onChange={onChangeCategoryFilterHandler}
          options={categories.map((cate) => {
            if (cate.categoryName)
              return { key: cate.categoryName, value: cate.categoryName };
            return { key: "", value: "" };
          })}
        />
        <Select
          onChange={onChangeUnitOfMeasureFilterHandler}
          options={unitOfMeasures.map(p => {
            return {key:p.unitOfMeasureName, value:p.unitOfMeasureName}
          })}
        />
      </div>
      <div className={style.productList}>
        {items.map((p) => {
          return displayWay === "grid" ? (
            <Card
              key={p.id}
              id={p.id}
              title={p.title}
              media={p.media}
              unitOfMeasure={p.unitOfMeasure.unitOfMeasureName}
              category={p.category.categoryName}
            />  
          ) : (
            <ProductRow
              key={p.id}
              id={p.id}
              title={p.title}
              media={p.media}
              unitOfMeasure={p.unitOfMeasure.unitOfMeasureName}
              category={p.category.categoryName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
