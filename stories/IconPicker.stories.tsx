import React from 'react';
import { Meta, Story } from '@storybook/react';
import IconPicker, { IconPickerProps } from '../src/IconPicker';

export default {
	title: 'components/IconPicker',
	component: IconPicker,
} as Meta;

const Template: Story<IconPickerProps> = (args) => <IconPicker {...args} />;

export const Default = Template.bind({});
Default.args = {
	value: 'IconPicker Value.',
};
