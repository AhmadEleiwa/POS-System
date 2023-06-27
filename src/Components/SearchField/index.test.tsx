import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchField from "./index";

describe("SearchField", () => {
  test("renders without errors", () => {
    render(<SearchField />);
  });

  test("calls onChange handler when input value changes", () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchField onChange={onChangeMock} />
    );
    const inputElement = getByPlaceholderText("Search");
    const inputValue = "example search";

    fireEvent.change(inputElement, { target: { value: inputValue } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue(inputValue);
    })

  test("clears input value when reset icon is clicked", () => {
    const { getByDisplayValue, getByTestId, queryByTestId } = render(
      <SearchField />
    );
    const inputElement = getByDisplayValue("");

    fireEvent.change(inputElement, { target: { value: "example search" } });

    const resetIconElement = getByTestId("reset-icon");
    fireEvent.click(resetIconElement);

    expect(inputElement).toBeInTheDocument();
    expect(queryByTestId("reset-icon")).toBeNull();
  });
});
