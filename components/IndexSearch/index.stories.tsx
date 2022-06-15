import { ComponentMeta, ComponentStory } from "@storybook/react";
import IndexSearch from "./index";

export default {
  component: IndexSearch,
} as ComponentMeta<typeof IndexSearch>;

const Template: ComponentStory<typeof IndexSearch> = (args) => (
  <div style={{ maxWidth: "900px" }}>
    <IndexSearch {...args} />
  </div>
);

export const Default = Template.bind({});
