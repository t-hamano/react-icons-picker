/**
 * External dependencies
 */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import useState from 'storybook-addon-state';
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
		position: {
			options: [
				'top',
				'top right',
				'right',
				'bottom right',
				'bottom',
				'bottom left',
				'left',
				'left top',
			],
			control: { type: 'inline-radio' },
		},
		className: { control: { type: 'text' } },
		title: { control: { type: 'text' } },
		closeOnSelect: { control: { type: 'boolean' } },
		shouldCloseOnEsc: { control: { type: 'boolean' } },
		focusOnSearch: { control: { type: 'boolean' } },
		showSearch: { control: { type: 'boolean' } },
		showCategory: { control: { type: 'boolean' } },
		showIconLabel: { control: { type: 'boolean' } },
		highlightMatchedString: { control: { type: 'boolean' } },
		searchPlaceholder: { control: { type: 'text' } },
		categoryPlaceHolder: { control: { type: 'text' } },
		noIconPlaceholder: { control: { type: 'text' } },
	},
} as Meta;

const Template: Story<IconPickerStoryProps> = (args) => {
	const [iconValue, setIconValue] = useState('iconValue', undefined);
	return <IconPicker {...args} value={iconValue} onChange={(value) => setIconValue(value)} />;
};

export const Default = Template.bind({});
Default.args = {
	value: 'IconPicker Value.',
	position: 'bottom',
	className: '',
	title: 'Select Icon',
	closeOnSelect: true,
	shouldCloseOnEsc: true,
	focusOnSearch: true,
	showSearch: true,
	showCategory: true,
	showIconLabel: true,
	highlightMatchedString: true,
	searchPlaceholder: 'search icons...',
	categoryPlaceHolder: 'all category',
	noIconPlaceholder: 'No icons found',
};
