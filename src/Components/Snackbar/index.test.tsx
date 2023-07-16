import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Snackbar from "./index";

const mockResponse = {
  message: "Success",
  status: 200,
};

describe("Snackbar", () => {
  test("renders snackbar with correct message and status", () => {
    render(<Snackbar response={mockResponse} onClose={() => {}} />);

    // Check if snackbar with message and status is rendered
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  test("calls onClose when X icon is clicked", () => {
    const onCloseMock = jest.fn();
    render(<Snackbar response={mockResponse} onClose={onCloseMock} />);

    const closeIcon = screen.getByTestId("close-icon");

    // Simulate click event on the close icon
    fireEvent.click(closeIcon);

    // Check if onClose is called
    expect(onCloseMock).toHaveBeenCalled();
  });
});
