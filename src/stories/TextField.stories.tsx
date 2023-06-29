import { Form, Formik } from "formik";
import TextField from "../Components/TextField";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../store/Reducers";

import { testSchema } from "../schema";

const comp = () => {
  return (
    <Provider store={configureStore({ reducer: rootReducer })}>
      <Formik
        onSubmit={() => {}}
        initialValues={{ test: "testField" }}
        validationSchema={testSchema}
      >
        <Form>
          <TextField name="testField" placeholder="Enter Text Here" />
        </Form>
      </Formik>
    </Provider>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Example/TextField",
  component: comp,
  tags: ["autodocs"],

  args: {
    placeholder: "Enter Text",
    name: "text-field",
    id: "text-field",
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const view = {
  args: {},
};
