import { ComponentMeta, ComponentStory } from "@storybook/react";
import Pagination, { PaginationProps } from "./Pagination";

export default {
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});
Default.args = {
  totalPages: 5,
  current: 1,
};

export const Long = Template.bind({});
Long.args = {
  totalPages: 10,
  current: 1,
};

export const Long2 = Template.bind({});
Long2.args = {
  totalPages: 20,
  current: 1,
};

export const Short = Template.bind({});
Short.args = {
  totalPages: 7,
  current: 1,
};

export const Short2 = Template.bind({});
Short2.args = {
  totalPages: 8,
  current: 1,
};
