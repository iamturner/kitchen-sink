import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Input from "./Input";

const meta: Meta<typeof Input> = {
  args: {
    onClick: fn(),
  },
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Input",
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {},
};
