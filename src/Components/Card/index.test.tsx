import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./index";

describe("Card component", () => {
  test("renders with default props", () => {
    const { getByText } = render(
      <Card
        title="Product"
        unitOfMeasure="kg"
        category="Category"
        media="image.jpg"
      />
    );
    const titleElement = getByText("Product");
    expect(titleElement).toBeInTheDocument();

    const unitOfMeasureElement = getByText("kg");
    expect(unitOfMeasureElement).toBeInTheDocument();

    const imageElement = document.querySelector("img");
    expect(imageElement).toHaveAttribute("src", "image.jpg");

    const addButtonElement = getByText("Add");
    expect(addButtonElement).toBeInTheDocument();
    expect(addButtonElement).toHaveClass("btn buttonAdd");
    fireEvent.click(addButtonElement);
  });

  test("renders with custom className", () => {
    const { container } = render(
      <Card
        title="Product"
        unitOfMeasure="kg"
        category="Category"
        media="image.jpg"
        className="custom-card"
      />
    );
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass("card");
    expect(cardElement).toHaveClass("custom-card");
  });
});
