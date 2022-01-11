/**
 * External dependencies
 */
import React from 'react';
import { Meta, Story } from '@storybook/react';

/**
 * Internal dependencies
 */
import Icon, { IconProps } from '../src/components/Icon';
import { allIcons } from '../src/utils/icon';

export default {
	title: 'components/Icon',
	component: Icon,
	argTypes: {
		size: {
			options: ['25px', '50px', '75px', '100px', '150px'],
			control: { type: 'inline-radio' },
		},
		value: {
			options: Object.keys(allIcons),
			control: { type: 'select' },
		},
		color: { control: { type: 'color' } },
	},
} as Meta;

const Template: Story<IconProps> = (args) => {
	return <Icon {...args} />;
};

export const Default = Template.bind({});
Default.args = {
	value: 'FaReact',
	size: '50px',
};
