import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("Button component", () => {
  test("renders with default props", () => {
    const { getByText } = render(<Button>Hello</Button>);
    const buttonElement = getByText("Hello");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("btn");
    expect(buttonElement).not.toHaveClass("primary");
    expect(buttonElement).not.toHaveClass("secondary");
    expect(buttonElement).not.toHaveClass("warning");
    expect(buttonElement).not.toHaveClass("error");
    expect(buttonElement).toHaveStyle({
      backgroundColor: "",
      width: "auto",
      padding: "0.7em 1em",
      color: "white",
    });
  });

  test("renders with custom props", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button
        variant="secondary"
        className="secondary"
        size="large"
        onClick={onClickMock}
        fullWidth
      >
        Click Me
      </Button>
    );
    const buttonElement = getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("btn");
    expect(buttonElement).toHaveClass("secondary");
    expect(buttonElement).not.toHaveClass("primary");
    expect(buttonElement).not.toHaveClass("warning");
    expect(buttonElement).not.toHaveClass("error");
    expect(buttonElement).toHaveStyle({
      backgroundColor: expect.any(String),
      width: "100%",
      padding: "1em 2em",
      color: "white",
    });

    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
