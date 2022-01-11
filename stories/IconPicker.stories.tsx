/**
 * External dependencies
 */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import useState from 'storybook-addon-state';

/**
 * Internal dependencies
 */
import IconPicker, { IconPickerProps } from '../src/components/IconPicker';

export default {
	title: 'components/IconPicker',
	component: IconPicker,
	argTypes: {
		value: { control: { type: 'text' } },
		className: { control: { type: 'text' } },
		showPreview: { control: { type: 'boolean' } },
		showSearch: { control: { type: 'boolean' } },
		showCategory: { control: { type: 'boolean' } },
		showIconLabel: { control: { type: 'boolean' } },
		highlightMatchedString: { control: { type: 'boolean' } },
		searchPlaceholder: { control: { type: 'text' } },
		categoryPlaceHolder: { control: { type: 'text' } },
		noIconPlaceholder: { control: { type: 'text' } },
		noSelectedPlaceholder: { control: { type: 'text' } },
		theme: {
			options: [
				{
					hoge: {
						primary: '#1e1e1e',
						accent: '#007cba',
						alert: '#cc1818',
					},
				},
			],
			control: { type: 'inline-radio' },
		},
	},
} as Meta;

const Template: Story<IconPickerProps> = (args) => {
	const [iconValue, setIconValue] = useState('iconValue', undefined);

	return (
		<IconPicker
			{...args}
			value={iconValue}
			onChange={(value) => {
				setIconValue(value);
			}}
			style={{
				minHeight: '500px',
			}}
		/>
	);
};

export const Default = Template.bind({});
Default.args = {
	className: '',
	showPreview: true,
	showSearch: true,
	showCategory: true,
	showIconLabel: true,
	highlightMatchedString: true,
	searchPlaceholder: 'search icons...',
	categoryPlaceHolder: 'all category',
	noIconPlaceholder: 'No icons found',
	noSelectedPlaceholder: 'No icon selected',
	theme: {
		primary: '#1e1e1e',
		accent: '#007cba',
		alert: '#cc1818',
	},
};
