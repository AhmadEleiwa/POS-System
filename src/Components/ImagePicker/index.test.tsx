import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImagePicker from "./index";
import { FormTest } from "../../utils/test-utils";
describe("ImagePicker", () => {
  it("renders without errors", () => {
    render(
      <FormTest init={{ image: { preview: "", img: "" } }}>
        <ImagePicker name="image" />
      </FormTest>
    );
    expect(screen.getByTestId("image-picker")).toBeInTheDocument();
  });
});
