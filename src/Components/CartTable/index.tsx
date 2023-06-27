import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FC, useState } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import SearchField from "../SearchField";
import { type } from "os";

const DATA_FROM_MOCK_API = [
  {
    id: "1",
    tax: 4,
    discount: 10,
    products: [, , , ,],
    description: "arder one",
  },
  {
    id: "2",
    tax: 8,
    discount: 14,
    products: [, , , ,],
    description: "aa   one",
  },
  {
    id: "3",
    tax: 4,
    discount: 18,
    products: [, , , , ,],
    description: "order one s sss sda asd order one s sss sda asd",
  },
  {
    id: "4",
    tax: 3,
    discount: 10,
    products: [, , , , , ,],
    description: "fff",
  },
];
const headings = [
  { key: "id", title: "CART ID" },
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
const CartTable: FC<props> = ({onChoose}) => {
  const [selectedColumn, setSelectedColumn] = useState<Selected>({
    key: "",
    status: "",
  });
  const theme = useTheme();

  const [items, setItems] = useState([...DATA_FROM_MOCK_API]);

  const filterHandler = (id: string) => {
    if (selectedColumn.key === id && selectedColumn.status === "ascending") {
      // logic to sort the items descending ; becouse the previous status is ascending
      // set the status to descending
      setItems([
        ...items.sort((prev: any, curr: any) => {
          if (prev[id] < curr[id]) return -1;
          else if (prev[id] > curr[id]) return 1;
          return 0;
        }),
      ]);
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
      setItems([...DATA_FROM_MOCK_API]);
      setSelectedColumn({
        key: "",
        status: "",
      });
    } else {
      // logic to sort the items ascending
      // set the status to ascending
      setItems([
        ...items.sort((prev: any, curr: any) => {
          if (prev[id] > curr[id]) return -1;
          else if (prev[id] < curr[id]) return 1;
          return 0;
        }),
      ]);
      setSelectedColumn({
        key: id,
        status: "ascending",
      });
    }
  };
  const onSearchHandler = (value: string) => {
    let data = [...DATA_FROM_MOCK_API];
    setItems(
      data.filter(
        (item) => item.description.startsWith(value) || item.id === value
      )
    );
  };
  return (
    <>
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
            onClick={()=>onChoose(item.id)}
            data-testid="cart-item"
            key={item.id}
            className={style.row}
            style={{ color: theme.palette.textSecondary }}
          >
            <p>#{item.id}</p>
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
    </>
  );
};
export default CartTable;
