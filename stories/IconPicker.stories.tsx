/**
 * External dependencies
 */
import React from 'react';
import { Meta, Story } from '@storybook/react';

/**
 * Internal dependencies
 */
import IconPicker, { IconPickerProps } from '../src/components/IconPicker';

export default {
	title: 'components/IconPicker',
	component: IconPicker,
	argTypes: {
		className: {
			control: { type: 'text' },
		},
	},
} as Meta;

const Template: Story<IconPickerProps> = (args) => <IconPicker {...args} />;

export const Default = Template.bind({});
Default.args = {
	value: 'IconPicker Value.',
	positionX: 'center',
	positionY: 'bottom',
};
