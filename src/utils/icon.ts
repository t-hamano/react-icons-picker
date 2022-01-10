/**
 * External dependencies
 */
import _ from 'lodash';

import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as DiIcons from 'react-icons/di';
import * as FiIcons from 'react-icons/fi';
import * as FcIcons from 'react-icons/fc';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as TiIcons from 'react-icons/ti';
import * as VscIcons from 'react-icons/vsc';
import * as WiIcons from 'react-icons/wi';
import * as CgIcons from 'react-icons/cg';

import type { IconType } from 'react-icons';

/**
 * A list of icons categorized by font library.
 */
const allIcons = [
	{ id: 'ai', icons: AiIcons },
	{ id: 'bs', icons: BsIcons },
	{ id: 'bi', icons: BiIcons },
	{ id: 'di', icons: DiIcons },
	{ id: 'fi', icons: FiIcons },
	{ id: 'fc', icons: FcIcons },
	{ id: 'fa', icons: FaIcons },
	{ id: 'gi', icons: GiIcons },
	{ id: 'go', icons: GoIcons },
	{ id: 'gr', icons: GrIcons },
	{ id: 'hi', icons: HiIcons },
	{ id: 'im', icons: ImIcons },
	{ id: 'io', icons: IoIcons },
	{ id: 'io5', icons: Io5Icons },
	{ id: 'md', icons: MdIcons },
	{ id: 'ri', icons: RiIcons },
	{ id: 'si', icons: SiIcons },
	{ id: 'ti', icons: TiIcons },
	{ id: 'vsc', icons: VscIcons },
	{ id: 'wi', icons: WiIcons },
	{ id: 'cg', icons: CgIcons },
];

/**
 * Type of the icon list retrieved by `getIcons()` function.
 */
export type Icons = {
	label: string;
	element: IconType;
}[];

/**
 * Function used to get filtered icon list.
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
		allIcons
			// Filter the icon set by the specified category
			.filter((categoryIcons) => {
				return !categories.length || (categories.length && categories.includes(categoryIcons.id));
			})
			// Filter the icon list by search query
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
