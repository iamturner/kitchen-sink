import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  args: {
    onClick: fn(),
  },
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Button",
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
    color: "primary",
    variant: "solid",
  },
};
