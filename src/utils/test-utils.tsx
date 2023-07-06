import { configureStore } from "@reduxjs/toolkit";
import { RenderOptions } from "@testing-library/react";
import { FC, PropsWithChildren } from "react";
import { render } from '@testing-library/react'
import { Provider } from "react-redux";
import { PreloadedState } from "redux";
import rootReducer, { RootState } from "../store/Reducers";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: ToolkitStore;
}
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({reducer:rootReducer}),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
      <Provider store={configureStore({ reducer: rootReducer })}>
        {children}
      </Provider>
    );
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
