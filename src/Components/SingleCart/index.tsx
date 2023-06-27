import {
  faArrowDown,
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import SearchField from "../SearchField";
import Row from "./Components/Row";
import Button from "../Button";

const DATA_FROM_MOCK_API = [
  {
    id: "1",
    title: "Doritos",
    price: 2.33,
    qty: 4,
    media: "https://picsum.photos/200/300",
  },
  {
    id: "",
    title: "Milk",
    price: 4.33,
    qty: 8,
    media: "https://picsum.photos/200/300",
  },
  {
    id: "1",
    title: "Doritos",
    price: 2.33,
    qty: 4,
    media: "https://picsum.photos/200/300",
  },
  {
    id: "",
    title: "Milk",
    price: 4.33,
    qty: 8,
    media: "https://picsum.photos/200/300",
  },
  {
    id: "1",
    title: "Doritos",
    price: 2.33,
    qty: 4,
    media: "https://picsum.photos/200/300",
  },
  {
    id: "",
    title: "Milk",
    price: 4.33,
    qty: 8,
    media: "https://picsum.photos/200/300",
  },
  {
    id: "1",
    title: "Doritos",
    price: 2.33,
    qty: 4,
    media: "https://picsum.photos/200/300",
  },
  {
    id: "",
    title: "Milk",
    price: 4.33,
    qty: 8,
    media: "https://picsum.photos/200/300",
  },
  {
    id: "1",
    title: "Doritos",
    price: 2.33,
    qty: 4,
    media: "https://picsum.photos/200/300",
  },
  {
    id: "",
    title: "Milk",
    price: 4.33,
    qty: 8,
    media: "https://picsum.photos/200/300",
  },
];
const headings = [
  { key: "id", title: "product" },
  { key: "qty", title: "QTY" },
  { key: "price", title: "price" },
];

interface props {
  onClick?: () => void;
  orderId: string;
}
type Selected = {
  key: string;
  status: "descending" | "ascending" | "";
};
const SingleCart: FC<props> = ({ onClick, orderId }) => {
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
      data.filter((item) => item.title.startsWith(value) || item.id === value)
    );
  };
  return (
    <div className={style.single}>
      <div className={style.orderHead}>
        <h1 style={{ color: theme.palette.textPrimary }}>Order : #{orderId}</h1>
        <FontAwesomeIcon
          className={style.arrowRight}
          icon={faArrowRight}
          color={theme.palette.textPrimary}
          cursor={"pointer"}
          onClick={onClick}
        />
      </div>
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
          <Row
            title={item.title}
            media={item.media}
            price={item.price}
            qty={item.qty}
          />
        ))}
      </div>
      <div className={style.orderData} style={{color:theme.palette.textPrimary}}>
        <div className={style.row}>
          <p>Discount</p>
          <p>0</p>
        </div>
        <div className={style.row}>
          <p>Tax</p>
          <p>0</p>
        </div>
        <div className={style.row}>
          <p>Total</p>
          <p>0</p>
        </div>
        <Button variant="error" fullWidth>
          Continue Payment
        </Button>
      </div>
    </div>
  );
};
export default SingleCart;
