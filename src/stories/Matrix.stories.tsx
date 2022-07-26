import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Matrix } from "../Matrix";

export default {
    title: 'Matrix',
    component: Matrix,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Matrix>;

const Template: ComponentStory<typeof Matrix> = (args) => <Matrix {...args} />;

export const Default = Template.bind({});
Default.args = {
  backgroundColor: '#000',
};