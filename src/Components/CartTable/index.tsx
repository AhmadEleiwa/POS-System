import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import SearchField from "../SearchField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Reducers";
import Button from "../Button";
import { createCart } from "../../store/Actions";

const headings = [
  { key: "cartId", title: "CART ID" },
  { key: "tax", title: "TAX" },
  { key: "discount", title: "DISCOUNT" },
  { key: "products", title: "PRODS NO" },
  { key: "description", title: "DESCRIPTION" },
];

interface props {
  onChoose: (id: string) => void;
}
type Selected = {
  key: string;
  status: "descending" | "ascending" | "";
};
const CartTable: FC<props> = ({ onChoose }) => {
  const [selectedColumn, setSelectedColumn] = useState<Selected>({
    key: "",
    status: "",
  });
  const [searchValue, setSearchValue] = useState<string>("");

  const carts = useSelector<RootState>((state) => state.cartsReducer) as Cart[];
  const theme = useTheme();

  let items = [...carts];

  const dispatch = useDispatch()
  const newCartHandler = () =>{
    const newCart = dispatch(createCart('4'))
    onChoose(newCart.data.cartId)
  }
  const onSearchHandler = (value: string) => {
    setSearchValue(value);
  };
  const filterHandler = (id: string) => {
    if (selectedColumn.key === id && selectedColumn.status === "ascending") {
      // logic to sort the items descending ; becouse the previous status is ascending
      // set the status to descending
      setSelectedColumn({
        key: id,
        status: "descending",
      });
    } else if (
      selectedColumn.key === id &&
      selectedColumn.status === "descending"
    ) {
      // logic to back the items order as the default
      // set the status to ""
      setSelectedColumn({
        key: "",
        status: "",
      });
    } else {
      // logic to sort the items ascending
      // set the status to ascending
      setSelectedColumn({
        key: id,
        status: "ascending",
      });
    }
  };
  if (selectedColumn.status === "ascending") {
    items.sort((prev: any, curr: any) => {
      if (prev[selectedColumn.key] < curr[selectedColumn.key]) return -1;
      else if (prev[selectedColumn.key] > curr[selectedColumn.key]) return 1;
      return 0;
    });
  } else if (selectedColumn.status === "descending") {
    items.sort((prev: any, curr: any) => {
      if (prev[selectedColumn.key] > curr[selectedColumn.key]) return -1;
      else if (prev[selectedColumn.key] < curr[selectedColumn.key]) return 1;
      return 0;
    });
  } else {
    items = [...carts];
  }
  items = items.filter((p) => p.description.startsWith(searchValue));
  return (
    <div className={style.container}>
      <SearchField width="95%" color="#66666622" onChange={onSearchHandler} />

      <div className={style.table}>
        <div className={style.head}>
          {headings.map((item) => (
            <div
              className={style.heading}
              key={item.key}
              onClick={() => filterHandler(item.key)}
            >
              <p style={{ color: theme.palette.textPrimary }}>{item.title}</p>
              {selectedColumn.key === item.key &&
                selectedColumn.status === "ascending" && (
                  <FontAwesomeIcon
                    fontSize={14}
                    color={theme.palette.textSecondary}
                    icon={faArrowDown}
                  />
                )}
              {selectedColumn.key === item.key &&
                selectedColumn.status === "descending" && (
                  <FontAwesomeIcon
                    fontSize={14}
                    color={theme.palette.textSecondary}
                    icon={faArrowUp}
                  />
                )}
            </div>
          ))}
        </div>
        {items.map((item) => (
          <div
            onClick={() => onChoose(item.cartId)}
            data-testid="cart-item"
            key={item.cartId}
            className={style.row}
            style={{ color: theme.palette.textSecondary }}
          >
            <p>#{item.cartId}</p>
            <p>{item.tax}</p>
            <p>{item.discount}</p>
            <p>{item.products.length}</p>
            <p>
              {item.description.length > 15
                ? item.description.slice(0, 15) + "..."
                : item.description}
            </p>
          </div>
        ))}
      </div>
      <Button variant="error" onClick={newCartHandler}>New Cart</Button>
    </div>
  );
};
export default CartTable;
