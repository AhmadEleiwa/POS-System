import { configureStore } from "@reduxjs/toolkit";
import { RenderOptions } from "@testing-library/react";
import { FC, PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { PreloadedState } from "redux";
import rootReducer, { RootState } from "../store/Reducers";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import CartTable from "../Components/CartTable";
import { Form, Formik } from "formik";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: ToolkitStore;
}
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},

    store = configureStore({ reducer: rootReducer }),
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

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
interface TestProps extends PropsWithChildren{
  init:any;
}
export const FormTest: FC<TestProps> = ({ children, init }) => {
  return (
    <Formik initialValues={init} onSubmit={() => {}}>
      <Form>{children}</Form>
    </Formik>
  );
};
export const CartTableWithCartState: FC = () => {
  const carts = useSelector<RootState>((state) => state.cartsReducer) as Cart[];
  return <CartTable carts={carts} onChoose={() => {}} />;
};
