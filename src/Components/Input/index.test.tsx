import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./index";

describe("Input", () => {
  test("renders input element with correct props", () => {
    const onChangeMock = jest.fn();
    render(
      <Input
        placeholder="Enter text"
        width="200px"
        color="red"
        type="text"
        id="inputId"
        name="inputName"
        value="Hello"
        onChange={onChangeMock}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter text");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("id", "inputId");
    expect(inputElement).toHaveAttribute("name", "inputName");
    expect(inputElement).toHaveValue("Hello");
  });

  test("calls onChange function when input value changes", () => {
    const onChangeMock = jest.fn();
    render(<Input onChange={onChangeMock} />);

    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "New value" } });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
