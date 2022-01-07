import React from 'react';
import { Meta, Story } from '@storybook/react';
import Icon, { IconProps } from '../src/Icon';

export default {
	title: 'components/Icon',
	component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
	value: 'Icon Value.',
};
