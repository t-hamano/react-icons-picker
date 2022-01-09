/**
 * External dependencies
 */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import * as AllIcons from 'react-icons/all';
// @ts-ignore
import { IconsManifest } from 'react-icons';

/**
 * Internal dependencies
 */
import Icon, { IconProps } from '../src/components/Icon';

// Extract only the first 50 icons from each icon library to reduce the rendering load on the select box.
const filteredIcons = [];
const iconCategories = IconsManifest.sort((a, b) => (a.name > b.name ? 1 : -1));

iconCategories.sort().forEach((icon) => {
	filteredIcons.push(
		...Object.keys(AllIcons)
			.filter((value) => !value.toLowerCase().indexOf(icon.id))
			.slice(0, 50)
	);
});

export default {
	title: 'components/Icon',
	component: Icon,
	argTypes: {
		size: {
			options: ['25px', '50px', '75px', '100px', '150px'],
			control: { type: 'inline-radio' },
		},
		value: {
			options: filteredIcons,
			control: {
				type: 'select',
			},
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
