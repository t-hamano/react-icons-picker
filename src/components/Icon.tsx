/**
 * External dependencies
 */
import React from 'react';

// Limit the number of libraries to keep the package bundle size down.
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
/* @ts-ignore */
import { IconsManifest } from 'react-icons';

/**
 * Icon list object
 */
export const allIcons = {
	...BsIcons,
	...FaIcons,
	...ImIcons,
	...MdIcons,
} as const;

/**
 * Icon category type
 */
export type IconCategory = {
	id: string;
	license: string;
	name: string;
	projectUrl: string;
};

/**
 * List of icon categories with library information
 */
export const iconCategories = IconsManifest.filter((iconCategory: IconCategory) => {
	return ['bs', 'fa', 'im', 'md'].includes(iconCategory.id);
});

export interface IconProps {
	value: string;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	[x: string]: any;
}

const Icon = ({ value, ...props }: IconProps) => {
	if (value in allIcons === false) {
		return null;
	}

	const Icon = allIcons[value as keyof typeof allIcons];

	return <Icon {...props} />;
};

export default Icon;
