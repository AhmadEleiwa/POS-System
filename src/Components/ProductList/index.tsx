import React, { FC } from "react";
import Card from "../Card";
import style from "./style.module.css";
let products = [
  {
    title: "hi",
    id: "1",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: "0.5kg",
    category: "Drink",
  },
  {
    title: "hi",
    id: "2",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: "0.5kg",
    category: "Drink",
  },
  {
    title: "hi",
    id: "3",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: "0.5kg",
    category: "Drink",
  },
  {
    title: "hi",
    id: "4",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: "0.5kg",
    category: "Drink",
  },
  {
    title: "hi",
    id: "5",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: "0.5kg",
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
  return (
    <div className={style.productList}>
      {products.map((p) => {
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
  );
};

export default ProductList;
