import ProductRow from "../Components/ProductRow";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Example/ProductRow",
  component: ProductRow,
  tags: ["autodocs"],
  args:{
    title:'Title',
    media:'https://picsum.photos/200/300',
    category:'Drink',
    unitOfMeasure:'10'
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const view = {
  args: {

  },
};
