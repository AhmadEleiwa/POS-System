import React, { FC } from "react";
import ProductList from "../../components/ProductList";
import Aside from "../../components/Aside";


/**
 * ## POS Page
 * POS Page is the main page of the system witch allow the user to handle the carts/orders.
 * It allow to add or delete products from the carts or even continue the payment.
 * ```ts
 * type Cart = {// order
 * cartId: uuid() //universal unique identifier
 * description: string,
 * tax: double,
 * discount: double,
 * products: Product[]
 * }
 * ```
 */
const PosPage: FC = () => {

  return (
    <>
      <ProductList />
      <Aside />
    </>
  );
};

export default PosPage;
