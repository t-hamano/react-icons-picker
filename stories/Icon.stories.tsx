/**
 * External dependencies
 */
import React from 'react';
import { Meta, Story } from '@storybook/react';

/**
 * Internal dependencies
 */
import Icon, { IconProps } from '../src/components/Icon';

export default {
	title: 'components/Icon',
	component: Icon,
	argTypes: {
		size: {
			control: { type: 'range', min: 0, max: 200, step: 1 },
		},
	},
} as Meta;

const Template: Story<IconProps> = (args) => {
	return <Icon {...args} />;
};

export const Default = Template.bind({});
Default.args = {
	value: 'FaReact',
};

export const HasSize = Template.bind({});
HasSize.args = {
	value: 'FaReact',
	size: 50,
};
