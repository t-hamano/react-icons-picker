/**
 * External dependencies
 */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import * as AllIcons from 'react-icons/all';
// @ts-ignore
import { IconsManifest } from 'react-icons/lib';

/**
 * Internal dependencies
 */
import Icon, { IconProps } from '../src/components/Icon';

// Extract only the first 100 icons from each icon library to reduce the rendering load on the select box.
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
			control: { type: 'range', min: 0, max: 200, step: 1 },
		},
		value: {
			options: filteredIcons,
			control: {
				type: 'select',
			},
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
