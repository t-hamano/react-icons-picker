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
	/* eslint @typescript-eslint/no-explicit-any: 0 */
	onChange: (value: any) => void;
	render: (param: { open: () => void }) => React.FC;
	className?: string;
	positionX: 'left' | 'center' | 'right';
	positionY: 'top' | 'middle' | 'bottom';
}

const IconPicker = ({
	// value,
	render,
	className,
	positionX = 'center',
	positionY = 'bottom',
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
		const positionStyles = getPopoverPositionStyles(clientRect, positionX, positionY);

		console.log(positionStyles);
		setPopoverPosition(positionStyles);
		setIsOpen(!isOpen);
	};

	const renderUi = render ? (
		render({ open })
	) : (
		<Trigger className="react-icons-picker__trigger" onClick={open}>
			select icon
		</Trigger>
	);

	return (
		<Container className={classNames('react-icons-picker', className)} ref={ref}>
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
	background: transparent;
	appearance: none;
	outline: none;
	color: #1e1e1e;
	padding: 0.5em 1em;
	border-radius: 2px;
	border: 1px solid currentColor;
`;

const Popover = styled.div`
	position: absolute;
	background-color: #fff;
	padding: 8px;
	width: 200px;
	max-height: 300px;
	border-radius: 2px;
	border: 1px solid #1e1e1e;
	z-index: 1000000;
`;
