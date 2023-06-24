import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CartTable from "./index";

describe("CartTable", () => {
  test("renders without errors", () => {
    render(<CartTable />);
  });

  test("filters items when search value changes", () => {
    const { getByPlaceholderText, getAllByTestId } = render(<CartTable />);
    const searchInput = getByPlaceholderText("Search");
    const items = getAllByTestId("cart-item");

    fireEvent.change(searchInput, { target: { value: "1" } });

    const filteredItems = getAllByTestId("cart-item");
    expect(filteredItems.length).toBeLessThan(items.length);
  });

});
