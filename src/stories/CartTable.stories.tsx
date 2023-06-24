import CartTable from "../Components/CartTable";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Example/CartTable",
  component: CartTable,
  tags: ["autodocs"],
  args:{
    width:'80%'
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const view = {
  args: {
    width:'80%'
  },
};
