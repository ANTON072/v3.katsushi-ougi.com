import { ComponentMeta, ComponentStory } from "@storybook/react";
import SearchBox from "./index";

export default {
  component: SearchBox,
} as ComponentMeta<typeof SearchBox>;

const Template: ComponentStory<typeof SearchBox> = (args) => (
  <div style={{ maxWidth: "700px" }}>
    <SearchBox {...args} />
  </div>
);

export const Default = Template.bind({});
