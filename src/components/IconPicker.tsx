/**
 * External dependencies
 */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
// import * as RiLib from 'react-icons/lib';
import type { CSSProperties } from 'react';

/**
 * Internal dependencies
 */
import { getPopoverPositionStyles } from '../utils/helper';

export interface IconPickerProps {
	value: string;
	showSearch?: boolean;
	showIconLabel?: boolean;
	/* eslint @typescript-eslint/no-explicit-any: 0 */
	onChange: (value: any) => void;
	render: (param: { open: () => void }) => React.FC;
	className?: string;
	containerStyles?: CSSProperties;
	position?: {
		x: 'left' | 'center' | 'right';
		y: 'top' | 'middle' | 'bottom';
	};
}

const IconPicker = ({
	// value,
	// showSearch = true,
	// showIconLabel = true,
	render,
	className,
	containerStyles,
	position = {
		x: 'center',
		y: 'bottom',
	},
}: IconPickerProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [popoverPosition, setPopoverPosition] = useState<CSSProperties | undefined>(undefined);

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
		const positionStyles = getPopoverPositionStyles(clientRect, position.x, position.y);
		setPopoverPosition(positionStyles);
		setIsOpen(!isOpen);
	};

	const renderUi = render ? (
		render({ open })
	) : (
		<Trigger className="react-icons-picker__trigger" onClick={open}>
			Select
		</Trigger>
	);

	return (
		<Container
			className={classNames('react-icons-picker', className)}
			style={containerStyles}
			ref={ref}
		>
			{renderUi}
			{isOpen && (
				<Popover style={popoverPosition} className={classNames('react-icons-picker__popover')}>
					inner
				</Popover>
			)}
		</Container>
	);
};

export default IconPicker;

const Container = styled.div`
	position: relative;
`;

const Trigger = styled.button`
	border: none;
	cursor: pointer;
	background: #7f8c8d;
	appearance: none;
	outline: none;
	color: white;
	padding: 0.5em 1em;
	border-radius: 5px;
`;

const Popover = styled.div`
	position: absolute;
	background-color: #fff;
	padding: 5px;
	width: 200px;
	max-height: 300px;
	border-radius: 4px;
	border-width: 2px;
	border-color: #000;
	border-style: solid;
	z-index: 10;
`;
