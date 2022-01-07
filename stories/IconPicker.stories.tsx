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
} as Meta;

const Template: Story<IconPickerProps> = (args) => <IconPicker {...args} />;

export const Default = Template.bind({});
Default.args = {
	value: 'IconPicker Value.',
};

export const StyledTrigger = Template.bind({});

StyledTrigger.args = {
	value: 'IconPicker Value.',
	className: 'some-class',
	render: ({ open }) => (
		<button
			onClick={open}
			style={{
				border: 'none',
				cursor: 'pointer',
				background: 'red',
				appearance: 'none',
				outline: 'none',
				color: 'white',
				padding: '1em',
				borderRadius: '5px',
			}}
		>
			Toggle Icon Picker
		</button>
	),
};
