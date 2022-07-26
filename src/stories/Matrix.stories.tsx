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
        primaryColor: { control: 'color' },
        flashedColor: { control: 'color' },
        fontSize: { control: 'number' },
        fontFamily: { control: false },
        animationSpeed: { control: { type: 'range', min: 1, max: 100, step: 1 } },
        chars: { control: 'text' },
        dropPercentage: { control: { type: 'range', min: 1, max: 100, step: 1 } },
        charChangeRate: { control: { type: 'range', min: 0, max: 100, step: 1 } },
        opacityChangeRate: { control: { type: 'range', min: 0, max: 100, step: 1 } },
        fadedPercentage: { control: { type: 'range', min: 0, max: 100, step: 1 } },
        hiddenPercentage: { control: { type: 'range', min: 0, max: 100, step: 1 } },
        colors: {
            table: {
                disable: true
            }
        },
        dimensions: {
            control: false
        }
    },
} as ComponentMeta<typeof Matrix>;

const Template: ComponentStory<typeof Matrix> = (args) => <Matrix {...args} />;

export const Default = Template.bind({});
Default.args = {
    backgroundColor: '#000',
    primaryColor: "rgb(55,255,55)",
    flashedColor: "#fff",
    fontSize: 20,
    fontFamily: 'roboto',
    animationSpeed: 75,
    chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}",
    dropPercentage: 50,
    charChangeRate: 16,
    opacityChangeRate: 4,
    fadedPercentage: 25,
    hiddenPercentage: 25,
};