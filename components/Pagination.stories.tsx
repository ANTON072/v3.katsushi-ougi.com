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
