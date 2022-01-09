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
import IconList from './IconList';
import { getPopoverPositionStyles } from '../utils/helper';
import { theme } from '../utils/constants';

export interface IconPickerProps {
	value: string;
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
	minCharaPlaceHolder?: string;
	categoryPlaceHolder?: string;
	noIconPlaceholder?: string;
	// onChange: (value: any) => void;
	render: (param: { open: () => void }) => React.FC;
}

const IconPicker = ({
	// value,
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
	minCharaPlaceHolder = 'Please enter at least 3 characters to search...',
	categoryPlaceHolder = 'all category',
	noIconPlaceholder = 'No icons found',
	// onChange,
	render,
}: IconPickerProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [popoverPosition, setPopoverPosition] = useState<CSSProperties | undefined>(undefined);

	const categories = category ? [category] : [];
	const colCount = 5;

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

	const open = () => {
		if (!ref.current) return;

		const clientRect = ref.current.getBoundingClientRect();
		const positionStyles = getPopoverPositionStyles(clientRect, position);

		setPopoverPosition(positionStyles);
		setIsOpen(!isOpen);
	};

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

	const searchProps = {
		searchPlaceholder,
		focusOnSearch,
		query,
		setQuery,
	};

	const categoryProps = {
		categoryPlaceHolder,
		category,
		setCategory,
	};

	const iconListProps = {
		query,
		categories,
		colCount,
		closeOnSelect,
		showIconLabel,
		highlightMatchedString,
		minCharaPlaceHolder,
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
				<Popover style={popoverPosition} className={classNames('react-icons-picker__popover')}>
					{title && <PopoverTitle className="react-icons-picker__title">{title}</PopoverTitle>}
					{showSearch && <Search {...searchProps} />}
					{showCategory && <Category {...categoryProps} />}
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
	color: ${theme.color.font};
	font-size: ${theme.fontSize.default};

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
	color: ${theme.color.font};
	padding: 0.5em 1em;
	border-radius: ${theme.radius.ui};
	border: 1px solid currentColor;
`;

const Popover = styled.div`
	position: absolute;
	background-color: #fff;
	padding: 16px;
	width: 360px;
	border-radius: ${theme.radius.ui};
	border: 1px solid ${theme.color.gray.primary};
	z-index: 1000000;
	max-width: calc(100vw - 24px);
`;

const PopoverTitle = styled.div`
	text-align: center;
	font-weight: bold;
	margin-bottom: 12px;
`;
