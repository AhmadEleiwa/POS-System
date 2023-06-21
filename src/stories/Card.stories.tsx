import Card from "../Components/Card";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Example/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "title",
    unitOfMeasure: "0.5kg",
    category: "drink",
    media: "https://picsum.photos/200/300",

  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const view = {
  args: {
    title: "test",
    
  },
};
