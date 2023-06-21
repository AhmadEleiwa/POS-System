import Navbar from "../Components/Navbar";
import { withRouter } from 'storybook-addon-react-router-v6';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Example/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  decorators: [withRouter],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const view = {
  args: {},
};
