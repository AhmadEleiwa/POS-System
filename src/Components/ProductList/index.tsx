import React, { FC, useState } from "react";
import Card from "../Card";
import style from "./style.module.css";
import SearchField from "../SearchField";
import useTheme from "../../context/Theme/useTheme";
import { ChangeEvent } from "react";
import Select from "../Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells, faTableList } from "@fortawesome/free-solid-svg-icons";
let products = [
  {
    title: "burgur",
    id: "1",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: "0.5kg",
    category: "Meat",
  },
  {
    title: "coco cola",
    id: "2",
    media: "https://picsum.photos/200/301",
    unitOfMeasure: "350ml",
    category: "Drink",
  },
  {
    title: "doritos",
    id: "3",
    media: "https://picsum.photos/200/306",
    unitOfMeasure: "200g",
    category: "Snack",
  },
  {
    title: "milk",
    id: "4",
    media: "https://picsum.photos/200/302",
    unitOfMeasure: "350ml",
    category: "Drink",
  },
  {
    title: "pepsi",
    id: "5",
    media: "https://picsum.photos/200/303",
    unitOfMeasure: "350ml",
    category: "Drink",
  },
  {
    title: "hi",
    id: "6",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: "0.5kg",
    category: "Drink",
  },
  {
    title: "hi",
    id: "7",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: "0.5kg",
    category: "Drink",
  },
  {
    title: "hi",
    id: "8",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: "0.5kg",
    category: "Drink",
  },
  {
    title: "hi",
    id: "9",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: "0.5kg",
    category: "Drink",
  },
  {
    title: "hi",
    id: "10",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: "0.5kg",
    category: "Drink",
  },
];
const ProductList: FC = () => {
  const theme = useTheme();
  const [items, setItems] = useState([...products]);
  const [filters, setFilters] = useState({
    category: "all",
    unitOfMeasure: "all",
  });

  const searchHandler = (value: string) => {
    setItems([
      ...products.filter(
        (p) =>
          (filters.category === "all"
            ? true
            : p.category === filters.category) &&
          (filters.unitOfMeasure === "all"
            ? true
            : p.unitOfMeasure === filters.unitOfMeasure) &&
          (p.category === value ||
            p.title.startsWith(value) ||
            (p.title + " " + p.unitOfMeasure).startsWith(value) ||
            p.unitOfMeasure.startsWith(value))
      ),
    ]);
  };
  const onChangeCategoryFilterHandler = (value: string) => {
    setFilters((p) => {
      return { ...p, category: value };
    });
    setItems([
      ...products.filter(
        (p) =>
          (filters.unitOfMeasure === "all"
            ? true
            : p.unitOfMeasure === filters.unitOfMeasure) &&
          (value === "all" ? true : p.category === value)
      ),
    ]);
  };

  const onChangeUnitOfMeasureFilterHandler = (value: string) => {
    setFilters((p) => {
      return { ...p, unitOfMeasure: value };
    });
    setItems([
      ...products.filter(
        (p) =>
          (filters.category === "all"
            ? true
            : p.category === filters.category) &&
          (value === "all" ? true : p.unitOfMeasure === value)
      ),
    ]);
  };
  return (
    <div className={style.container}>
      <div className={style.head}>
        <h1 style={{ color: theme.palette.textPrimary }}>EMMARKET</h1>
        <SearchField onChange={searchHandler} />
      </div>
      <div className={style.controls}>
        <FontAwesomeIcon
          icon={faTableCells}
          cursor={"pointer"}
          color={theme.palette.textPrimary}
        />
        <FontAwesomeIcon
          icon={faTableList}
          cursor={"pointer"}
          color={theme.palette.textPrimary}
        />
        <Select
          onChange={onChangeCategoryFilterHandler}
          options={[
            { key: "all", value: "All" },
            { key: "Drink", value: "Drink" },
            { key: "Snack", value: "Snack" },
            { key: "Meat", value: "Meat" },
          ]}
        />
        <Select
          onChange={onChangeCategoryFilterHandler}
          options={[
            { key: "all", value: "All" },
            { key: "350ml", value: "350ml" },
            { key: "0.5kg", value: "0.5kg" },
            { key: "200g", value: "200g" },
          ]}
        />
      </div>
      <div className={style.productList}>
        {items.map((p) => {
          return (
            <Card
              key={p.id}
              title={p.title}
              media={p.media}
              unitOfMeasure={p.unitOfMeasure}
              category={p.category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
