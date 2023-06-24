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
  test("sorts items in ascending order when clicking on column header", () => {
    const { getAllByTestId, getByText } = render(<CartTable />);
    const taxColumnHeader = getByText("TAX");

    fireEvent.click(taxColumnHeader);
    fireEvent.click(taxColumnHeader);

    const items = getAllByTestId("cart-item");
    const firstItemTax = parseInt(items[0].childNodes[1].textContent!);
    const secondItemTax = parseInt(items[1].childNodes[1].textContent!);
    expect(firstItemTax).toBeLessThanOrEqual(secondItemTax);
  });

  test("resets the sort order when clicking on the same column header", () => {
    const { getAllByTestId, getByText } = render(<CartTable />);
    const taxColumnHeader = getByText("TAX");

    fireEvent.click(taxColumnHeader);

    const items = getAllByTestId("cart-item");
    const firstItemTax = parseInt(items[0].childNodes[1].textContent!);
    const secondItemTax = parseInt(items[1].childNodes[1].textContent!);
    expect(firstItemTax).toBeGreaterThanOrEqual(secondItemTax);
  });
});
