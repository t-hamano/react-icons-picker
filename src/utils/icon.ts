/**
 * External dependencies
 */
import _ from 'lodash';

// Limit the number of libraries to keep the package bundle size down.
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';

import type { IconType } from 'react-icons';
/* @ts-ignore */
import { IconsManifest } from 'react-icons';

/**
 * A list of icons categorized by font library
 */
export const allIcons = {
	...BsIcons,
	...FaIcons,
	...ImIcons,
	...MdIcons,
};

/**
 * A list of icons categorized by font library
 */

export const iconsLib = [
	{ id: 'bs', icons: BsIcons },
	{ id: 'fa', icons: FaIcons },
	{ id: 'im', icons: ImIcons },
	{ id: 'md', icons: MdIcons },
];

/**
 * Type of the icon list retrieved by `getIcons()` function
 */
export type Icons = {
	label: string;
	element: IconType;
}[];

/**
 * List of icon categories with library information
 */
export const iconCategories = IconsManifest.sort(
	(a: typeof IconsManifest, b: typeof IconsManifest) => (a.name > b.name ? 1 : -1)
).filter((iconCategory: typeof IconsManifest) => {
	return ['bs', 'fa', 'im', 'md'].includes(iconCategory.id);
});

/**
 * Function used to get filtered icon list
 */
export function getIcons({
	query = '',
	categories = [],
}: {
	query: string;
	categories: string[];
}): Icons {
	const lowerCaseQuery = query.toLowerCase();

	return (
		iconsLib
			// Filter the icon set by the specified category.
			.filter((categoryIcons) => {
				return !categories.length || (categories.length && categories.includes(categoryIcons.id));
			})
			// Filter the icon list by search query.
			.reduce((result: Icons, { icons }) => {
				const filteredIcons = _.pickBy(
					icons,
					(value, key) => typeof value === 'function' && key.toLowerCase().match(lowerCaseQuery)
				);
				if (Object.keys(filteredIcons).length) {
					result.push(
						...Object.entries(filteredIcons).map(([key, value]) => ({ label: key, element: value }))
					);
				}
				return result;
			}, [])
	);
}
