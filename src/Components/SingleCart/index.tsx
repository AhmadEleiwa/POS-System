import {
  faArrowDown,
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FC, useState } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import SearchField from "../SearchField";
import Row from "./Components/Row";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Reducers";
import { Formik, Form } from "formik";
import {
  checkCart,
  deleteCartProduct,
  updateCart,
  updateCartProduct,
} from "../../store/Actions";
import Input from "../Input";

const headings = [
  { key: "id", title: "product" },
  { key: "qty", title: "QTY" },
  { key: "price", title: "price" },
];

interface props {
  onClick?: () => void;
  orderId: string;
  onRemoveOrder: () => void;
}
type Selected = {
  key: string;
  status: "descending" | "ascending" | "";
};
const SingleCart: FC<props> = ({ onClick, orderId, onRemoveOrder }) => {
  const [selectedColumn, setSelectedColumn] = useState<Selected>({
    key: "",
    status: "",
  });
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useDispatch();
  const theme = useTheme();
  const cart = (
    useSelector<RootState>((state) => state.cartsReducer) as Cart[]
  ).find((p) => p.cartId === orderId) as Cart;
  let items = [...cart.products];
  const qtyChangeHandler = (value: string, id: string) => {
    let val = value === "" ? "1" : value;
    // logic to change the quantity for this product in the cart
    dispatch(updateCartProduct(orderId, id, { qty: parseInt(val) }));
  };
  const descriptionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // logic to change the description for this product in the cart
    dispatch(updateCart(orderId, { description: event.target.value }));
  };
  const onDeleteProduct = (id: string) => {
    dispatch(deleteCartProduct(orderId, id));
  };
  const updateDiscount = (event: ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value === "" ? "0" : event.target.value;
    dispatch(
      updateCart(orderId, {
        discount: parseInt(val) / 100,
      })
    );
  };
  const updateTax = (event: ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value === "" ? "0" : event.target.value;
    dispatch(updateCart(orderId, { tax: parseInt(val) / 100 }));
  };
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
    if (selectedColumn.key === "price") {
      items.sort((prev: any, curr: any) => {
        if (
          prev[selectedColumn.key] * prev["qty"] <
          curr[selectedColumn.key] * curr["qty"]
        )
          return -1;
        else if (prev[selectedColumn.key] > curr[selectedColumn.key]) return 1;
        return 0;
      });
    } else {
      items.sort((prev: any, curr: any) => {
        if (prev[selectedColumn.key] < curr[selectedColumn.key]) return -1;
        else if (prev[selectedColumn.key] > curr[selectedColumn.key]) return 1;
        return 0;
      });
    }
  } else if (selectedColumn.status === "descending") {
    if (selectedColumn.key === "price") {
      items.sort((prev: any, curr: any) => {
        if (
          prev[selectedColumn.key] * prev["qty"] >
          curr[selectedColumn.key] * curr["qty"]
        )
          return -1;
        else if (prev[selectedColumn.key] < curr[selectedColumn.key]) return 1;
        return 0;
      });
    } else {
      items.sort((prev: any, curr: any) => {
        if (prev[selectedColumn.key] > curr[selectedColumn.key]) return -1;
        else if (prev[selectedColumn.key] < curr[selectedColumn.key]) return 1;
        return 0;
      });
    }
  } else {
    items = cart.products;
  }
  items = items.filter((p) => p.title.startsWith(searchValue));
  let totalPrice = 0;
  for (let val of items) {
    totalPrice += val.qty * val.price;
  }
  totalPrice += -totalPrice * cart.discount + totalPrice * cart.tax;

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
      <Formik
        onSubmit={() => {
          dispatch(checkCart(orderId));
          onRemoveOrder();
        }}
        initialValues={{ description: cart.description }}
      >
        <Form
          style={{
            width: "95%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
          }}
        >
          <SearchField
            width="100%"
            color="#66666622"
            onChange={onSearchHandler}
          />
          <Input
            name="description"
            value={cart.description}
            onChange={descriptionChangeHandler}
            width="100%"
          />
          <div className={style.table}>
            <div className={style.head}>
              {headings.map((item) => (
                <div
                  className={style.heading}
                  key={item.key}
                  onClick={() => filterHandler(item.key)}
                >
                  <p style={{ color: theme.palette.textPrimary }}>
                    {item.title}
                  </p>
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
                key={item.id}
                unitOfMeasure={item.unitOfMeasure.unitOfMeasureName}
                onDelete={onDeleteProduct}
                onQTYChange={qtyChangeHandler}
                id={item.id}
                title={item.title}
                media={item.media}
                price={item.price}
                qty={item.qty}
              />
            ))}
          </div>
          <div
            className={style.orderData}
            style={{ color: theme.palette.textPrimary }}
          >
            <div className={style.row}>
              <p>Discount</p>
              <div className={style.rowValue}>
                <p>-%{(cart.discount * 100).toFixed(2)}</p>
                <Input
                  onChange={updateDiscount}
                  width="8em"
                  type="number"
                  value={(cart.discount * 100).toFixed(0)}
                />
              </div>
            </div>
            <div className={style.row}>
              <p>Tax</p>
              <div className={style.rowValue}>
                <p>+%{(cart.tax * 100).toFixed(2)}</p>
                <Input
                  onChange={updateTax}
                  width="8em"
                  type="number"
                  value={(cart.tax * 100).toFixed(0)}
                />
              </div>
            </div>
            <div className={style.row}>
              <p>Total</p>
              <p>$ {totalPrice.toFixed(2)}</p>
            </div>
            <Button type="submit" variant="error" fullWidth>
              Continue Payment
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default SingleCart;
