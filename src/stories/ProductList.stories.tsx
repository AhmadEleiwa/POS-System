import ProductList from "../Components/ProductList";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Example/ProductList",
  component: ProductList,
  tags: ["autodocs"],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const view = {
  args: {
    options:[
        {key:'option', value:"Option 1"},
        {key:'option1', value:"Option 2"},
        {key:'option2', value:"Option 3"},
        {key:'option3', value:"Option 4"},

    ]
  },
};
