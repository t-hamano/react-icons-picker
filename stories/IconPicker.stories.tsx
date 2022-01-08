/**
 * External dependencies
 */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import * as AllIcons from 'react-icons/fa';

/**
 * Internal dependencies
 */
import IconPicker, { IconPickerProps } from '../src/components/IconPicker';

interface IconPickerStoryProps extends IconPickerProps {
	value: keyof typeof AllIcons;
}

export default {
	title: 'components/IconPicker',
	component: IconPicker,
	argTypes: {
		className: {
			control: { type: 'text' },
		},
	},
} as Meta;

const Template: Story<IconPickerStoryProps> = (args) => <IconPicker {...args} />;

export const Default = Template.bind({});
Default.args = {
	value: 'IconPicker Value.',
	positionX: 'center',
	positionY: 'bottom',
};
