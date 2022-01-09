/**
 * External dependencies
 */
import type React from 'react';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { getIcons } from '../utils/icon';
import { theme } from '../utils/constants';

interface IconListProps {
	query: string;
	categories: string[];
	colCount: number;
	closeOnSelect: boolean;
	showIconLabel: boolean;
	highlightMatchedString: boolean;
	minCharaPlaceHolder: string;
	noIconPlaceholder: string;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const IconList = ({
	query = '',
	categories = [],
	colCount,
	closeOnSelect,
	showIconLabel,
	highlightMatchedString,
	minCharaPlaceHolder,
	noIconPlaceholder,
	setIsOpen,
}: IconListProps) => {
	const iconList = getIcons(query, categories).slice(0, 20);

	const highlightedLabel = (label: string) => {
		if (query.length > 2 && highlightMatchedString) {
			const hightlightPattern = new RegExp(`(${query})`, 'i');
			return label
				.split(hightlightPattern)
				.map((part) => (part.match(hightlightPattern) ? <strong>{part}</strong> : part));
		}
		return label;
	};

	/* eslint-disable @typescript-eslint/no-unused-vars */
	const onClick = (label: string) => {
		if (closeOnSelect && label) {
			setIsOpen(false);
		}
	};

	return (
		<Container className="react-icons-picker-icon-list">
			{query && query.length <= 2 ? (
				<p className="react-icons-picker-icon-list__placeholder">{minCharaPlaceHolder}</p>
			) : iconList.length ? (
				<List className="react-icons-picker-icon-list__list">
					{iconList.map((icon, index) => {
						return (
							<Item colCount={colCount} key={index} className="react-icons-picker-icon-list__item">
								<ItemButton
									className="react-icons-picker-icon-list__item-button"
									aria-label={icon.label}
									title={icon.label}
									onClick={() => onClick(icon.label)}
								>
									{typeof icon.element === 'function' && icon.element({ size: '1em' })}
									{showIconLabel && (
										<ItemLabel className="react-icons-picker-icon-list__item-label">
											{highlightedLabel(icon.label)}
										</ItemLabel>
									)}
								</ItemButton>
							</Item>
						);
					})}
				</List>
			) : (
				<p className="react-icons-picker-icon-list__placeholder">{noIconPlaceholder}</p>
			)}
		</Container>
	);
};

export default IconList;

const Container = styled.div`
	margin: 0 -4px;
`;

const List = styled.div`
	display: flex;
	flex-wrap: wrap;
	text-align: center;
`;

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
const Item = styled(({ colCount, ...props }: { colCount: number; [x: string]: any }) => (
	<div {...props} />
))`
	padding: 2px;
	width: ${({ colCount }: { colCount: number }) => `${100 / colCount}%`};
`;

const ItemButton = styled((props) => <button {...props} />)`
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;
	width: 100%;
	border: none;
	padding: 8px;
	font-size: 24px;
	margin: 0;
	background: transparent;
	transition: border-color ${theme.transition.duration}, box-shadow ${theme.transition.duration};
	border-radius: ${theme.radius.ui};
	cursor: pointer;

	&:hover,
	&:focus {
		color: ${theme.color.primary};
		box-shadow: inset 0 0 0 1px ${theme.color.primary};
		outline: none;

		svg {
			transform: scale(1.4);
		}
	}

	svg {
		transition: transform ${theme.transition.duration};
	}
`;

const ItemLabel = styled.span`
	display: block;
	margin-top: 4px;
	overflow: hidden;
	font-size: 10px;
	width: 100%;

	strong {
		color: ${theme.color.primary};
	}
`;
