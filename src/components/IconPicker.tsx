/**
 * External dependencies
 */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import type { CSSProperties } from 'react';

/**
 * Internal dependencies
 */
import Search from './Search';
import Category from './Category';
import Pagination from './Pagination';
import IconList from './IconList';
import { getPopoverPositionStyles } from '../utils/helper';
import { theme, layout } from '../utils/constants';
import { getIcons } from '../utils/icon';
import type { Icons } from '../utils/icon';

export interface IconPickerProps {
	value: string | undefined;
	position?: string;
	className?: string;
	title?: string;
	closeOnSelect?: boolean;
	shouldCloseOnEsc?: boolean;
	focusOnSearch?: boolean;
	showSearch?: boolean;
	showCategory?: boolean;
	showIconLabel?: boolean;
	highlightMatchedString?: boolean;
	searchPlaceholder?: string;
	categoryPlaceHolder?: string;
	noIconPlaceholder?: string;
	onChange: (value: string) => void;
	render: (param: { open: () => void }) => React.FC;
}

const IconPicker = ({
	// value: iconValue,
	position = 'bottom',
	className,
	title = 'Select Icon',
	closeOnSelect = true,
	shouldCloseOnEsc = true,
	focusOnSearch = true,
	showSearch = true,
	showCategory = true,
	showIconLabel = true,
	highlightMatchedString = true,
	searchPlaceholder = 'search icons...',
	categoryPlaceHolder = 'all category',
	noIconPlaceholder = 'No icons found',
	// onChange,
	render,
}: IconPickerProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
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
	const [popoverPosition, setPopoverPosition] = useState<CSSProperties | undefined>(undefined);

	const categories = category ? [category] : [];
	const colCount = 5;

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

	// Close popover when the outside of popover is clicked.
	useEffect(() => {
		function handleClickOutside(event: Event) {
			if (
				event.target instanceof HTMLElement &&
				ref.current &&
				!ref.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		}
		document.addEventListener('click', {
			handleEvent: handleClickOutside,
		});
		return () => {
			document.removeEventListener('click', {
				handleEvent: handleClickOutside,
			});
		};
	}, [ref]);

	// Display popover at the specified position.
	const open = () => {
		if (!ref.current) return;

		const clientRect = ref.current.getBoundingClientRect();
		const positionStyles = getPopoverPositionStyles(clientRect, position);

		setPopoverPosition(positionStyles);
		setIsOpen(!isOpen);
	};

	// Close popover when the escape key is pressed.
	const handleEscapeKeyDown = (event: React.KeyboardEvent) => {
		if (shouldCloseOnEsc && event.keyCode === 27) {
			event.preventDefault();
			setIsOpen(false);
		}
	};

	const renderUi = render ? (
		render({ open })
	) : (
		<Trigger className="react-icons-picker__trigger" onClick={open}>
			select icon
		</Trigger>
	);

	// Search component props.
	const searchProps = {
		searchPlaceholder,
		focusOnSearch,
		query,
		setQuery,
	};

	// Category component props.
	const categoryProps = {
		categoryPlaceHolder,
		category,
		setCategory,
	};

	// Pagination component props.
	const paginationProps = {
		pageInfo,
		setPageInfo,
	};

	// IconList component props.
	const iconListProps = {
		iconList,
		pageInfo,
		query,
		colCount,
		closeOnSelect,
		showIconLabel,
		highlightMatchedString,
		noIconPlaceholder,
		setIsOpen,
	};

	return (
		<Container
			className={classNames('react-icons-picker', className)}
			ref={ref}
			onKeyDown={(event) => handleEscapeKeyDown(event)}
		>
			{renderUi}
			{isOpen && (
				<Popover
					style={popoverPosition}
					className={classNames('react-icons-picker__popover')}
					showIconLabel={showIconLabel}
				>
					{title && <PopoverTitle className="react-icons-picker__title">{title}</PopoverTitle>}
					{showSearch && <Search {...searchProps} />}
					{showCategory && <Category {...categoryProps} />}
					<Pagination {...paginationProps} />
					<IconList {...iconListProps} />
				</Popover>
			)}
		</Container>
	);
};

export default IconPicker;

const Container = styled.div`
	position: relative;
	line-height: 1.7;
	color: ${theme.default.font};
	font-size: ${layout.fontSize.default};

	* {
		box-sizing: border-box;
	}
`;

const Trigger = styled.button`
	border: none;
	cursor: pointer;
	background: transparent;
	appearance: none;
	outline: none;
	color: ${theme.default.font};
	padding: 0.5em 1em;
	border-radius: ${layout.radius.ui};
	border: 1px solid currentColor;
`;

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
const Popover = styled(
	({ showIconLabel, ...props }: { showIconLabel: boolean; [x: string]: any }) => <div {...props} />
)`
	position: absolute;
	background-color: #fff;
	padding: 8px;
	width: ${({ showIconLabel }: { showIconLabel: boolean }) => (showIconLabel ? '350px' : '240px')};
	border-radius: ${layout.radius.ui};
	border: 1px solid ${theme.default.gray.primary};
	z-index: 1000000;
	max-width: calc(100vw - 24px);
`;

const PopoverTitle = styled.div`
	text-align: center;
	font-weight: bold;
	margin-bottom: 8px;
`;
