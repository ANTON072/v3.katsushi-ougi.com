import { ComponentMeta, ComponentStory } from "@storybook/react";
import LaunchButton from "./LaunchButton";

export default {
  component: LaunchButton,
} as ComponentMeta<typeof LaunchButton>;

const Template: ComponentStory<typeof LaunchButton> = (args) => (
  <div style={{ maxWidth: "700px" }}>
    <LaunchButton {...args} />
  </div>
);

export const Default = Template.bind({});
