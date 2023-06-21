import Button from "../Components/Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  args:{variant: "primary", size:'normal'}
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};



export const Large = {
  args: {
    size: "large",
    children: "Button",
  },
};
export const normal = {
  args: {
    size: "normal",
    children: "Button",
  },
};

export const PrimaryColor = {
  args: {
    variant: "primary",
    children: "Button",

  },
};

export const WarningColor = {
  args: {
    variant: "warning",
    children: "Button",

  },
};

export const ErrorColor = {
  args: {
    children:'Error',
    variant: "error",
  },
};