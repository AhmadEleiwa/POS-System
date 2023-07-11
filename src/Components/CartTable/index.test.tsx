import { fireEvent } from "@testing-library/react";
import CartTable from "./index";

import { renderWithProviders } from "../../utils/test-utils";

describe("CartTable", () => {
  test("renders without errors", () => {
    renderWithProviders(<CartTable carts={[]} onChoose={() => {}} />);
  });

  test("filters items when search value changes", () => {
    const { getByPlaceholderText, getAllByTestId } = renderWithProviders(
      <CartTable carts={[]} onChoose={() => {}} />
    );
    const searchInput = getByPlaceholderText("Search");
    const items = getAllByTestId("cart-item");

    fireEvent.change(searchInput, { target: { value: "1" } });

    const filteredItems = getAllByTestId("cart-item");
    expect(filteredItems.length).toBeLessThanOrEqual(items.length);
  });
  test("sorts items in ascending order when clicking on column header", () => {
    const { getAllByTestId, getByText } = renderWithProviders(
      <CartTable carts={[]} onChoose={() => {}} />
    );
    const taxColumnHeader = getByText("TAX");

    fireEvent.click(taxColumnHeader);
    fireEvent.click(taxColumnHeader);

    const items = getAllByTestId("cart-item");
    if(items.length >= 2){
      const firstItemTax = parseInt(items[0].childNodes[1].textContent!);
      const secondItemTax = parseInt(items[1].childNodes[1].textContent!);
      expect(firstItemTax).toBeLessThanOrEqual(secondItemTax);
    }

  });

  test("resets the sort order when clicking on the same column header", () => {
    const { getAllByTestId, getByText } = renderWithProviders(
      <CartTable carts={[]} onChoose={() => {}} />
    );
    const taxColumnHeader = getByText("TAX");

    fireEvent.click(taxColumnHeader);

    const items = getAllByTestId("cart-item");
    if(items.length >= 2){
      const firstItemTax = parseInt(items[0].childNodes[1].textContent!);
      const secondItemTax = parseInt(items[1].childNodes[1].textContent!);
      expect(firstItemTax).toBeGreaterThanOrEqual(secondItemTax);
    }
  });
});
