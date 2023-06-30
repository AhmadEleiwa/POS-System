import { Form, Formik } from "formik";
import SelectFeild from "../Components/SelectFeild";
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
          <SelectFeild name="testField" options={[
            {key:'key1', value:'option1'},
            {key:'key2', value:'option2'},
            {key:'key3', value:'option3'},
          ]} />
        </Form>
      </Formik>
    </Provider>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Example/SelectFeild",
  component: comp,
  tags: ["autodocs"],

};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const view = {
  args: {},
};
