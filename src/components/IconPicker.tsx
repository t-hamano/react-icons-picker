/**
 * External dependencies
 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import type { Property } from 'csstype';

/**
 * Internal dependencies
 */
import Preview from './Preview';
import Search from './Search';
import Category from './Category';
import Pagination from './Pagination';
import IconList from './IconList';
import { getIcons } from '../utils/icon';
import type { Icons, IconValues } from '../utils/icon';

export type Theme = {
	primary?: Property.Color;
	accent?: Property.Color;
	alert?: Property.Color;
};

export interface IconPickerProps {
	value: IconValues | undefined;
	className?: string;
	showPreview?: boolean;
	showSearch?: boolean;
	showCategory?: boolean;
	showIconLabel?: boolean;
	highlightMatchedString?: boolean;
	searchPlaceholder?: string;
	categoryPlaceHolder?: string;
	noIconPlaceholder?: string;
	noSelectedPlaceholder?: string;
	onChange: (value: IconValues | undefined) => void;
	theme?: Theme;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	[x: string]: any;
}

const IconPicker = ({
	value,
	className,
	showPreview = true,
	showSearch = true,
	showCategory = true,
	showIconLabel = true,
	highlightMatchedString = true,
	searchPlaceholder = 'search icons...',
	categoryPlaceHolder = 'all category',
	noIconPlaceholder = 'No icons found',
	noSelectedPlaceholder = 'No icon selected',
	theme = {
		primary: '#1e1e1e',
		accent: '#007cba',
		alert: '#cc1818',
	},
	onChange,
	...otherProps
}: IconPickerProps) => {
	const [query, setQuery] = useState<string>('');
	const [iconList, setIconList] = useState<Icons>([]);
	const [pageInfo, setPageInfo] = useState<{
		currentPage: number | undefined;
		perPage: number;
		maxPage: number;
	}>({
		currentPage: 1,
		perPage: 20,
		maxPage: 1,
	});

	const [category, setCategory] = useState<string>('');

	const categories = category ? [category] : [];

	// Get a list of icons based on state.
	useEffect(() => {
		const iconList = getIcons({ query, categories });
		const maxPage = Math.trunc(iconList.length / pageInfo.perPage + 1);
		setIconList(iconList);
		setPageInfo({
			...pageInfo,
			maxPage,
		});
	}, []);

	useEffect(() => {
		const iconList = getIcons({ query, categories });
		const maxPage = Math.trunc(iconList.length / pageInfo.perPage + 1);
		setIconList(iconList);
		setPageInfo({
			...pageInfo,
			currentPage: 1,
			maxPage,
		});
	}, [category, query]);

	// Preview component props.
	const previewProps = {
		value,
		noSelectedPlaceholder,
		onChange,
		theme,
	};

	// Search component props.
	const searchProps = {
		searchPlaceholder,
		query,
		setQuery,
		theme,
	};

	// Category component props.
	const categoryProps = {
		categoryPlaceHolder,
		category,
		setCategory,
		theme,
	};

	// Pagination component props.
	const paginationProps = {
		pageInfo,
		setPageInfo,
		theme,
	};

	// IconList component props.
	const iconListProps = {
		value,
		iconList,
		pageInfo,
		query,
		showIconLabel,
		highlightMatchedString,
		noIconPlaceholder,
		onChange,
		theme,
	};

	return (
		<Container className={classNames('react-icons-picker', className)} {...otherProps}>
			{showPreview && <Preview {...previewProps} />}
			{showSearch && <Search {...searchProps} />}
			{showCategory && <Category {...categoryProps} />}
			<Pagination {...paginationProps} />
			<IconList {...iconListProps} />
		</Container>
	);
};

export default IconPicker;

const Container = styled.div`
	font-size: 12px;
	display: flex;
	flex-flow: column;
	width: 332px;
	max-width: 100%;

	* {
		box-sizing: border-box;
	}
`;
