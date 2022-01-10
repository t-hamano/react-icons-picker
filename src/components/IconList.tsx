/**
 * External dependencies
 */
import type React from 'react';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { theme, layout } from '../utils/constants';
import type { Icons } from '../utils/icon';

interface IconListProps {
	iconList: Icons;
	pageInfo: { currentPage: number | undefined; perPage: number };
	query: string;
	colCount: number;
	closeOnSelect: boolean;
	showIconLabel: boolean;
	highlightMatchedString: boolean;
	noIconPlaceholder: string;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const IconList = ({
	iconList,
	pageInfo,
	query,
	colCount,
	closeOnSelect,
	showIconLabel,
	highlightMatchedString,
	noIconPlaceholder,
	setIsOpen,
}: IconListProps) => {
	const offset = pageInfo.perPage * ((pageInfo.currentPage || 1) - 1);
	const filteredIconList = iconList.slice(offset, offset + pageInfo.perPage);

	// Highlight text that matches the query in the icon label.
	const highlightedLabel = (label: string) => {
		if (query.length && highlightMatchedString) {
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
			{filteredIconList.length ? (
				<List className="react-icons-picker-icon-list__list">
					{filteredIconList.map((icon, index) => {
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
				<Placeholder className="react-icons-picker-icon-list__placeholder">
					{noIconPlaceholder}
				</Placeholder>
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
	color: inherit;
	font-family: inherit;
	width: 100%;
	border: none;
	padding: 8px;
	font-size: 24px;
	margin: 0;
	background: transparent;
	transition: border-color ${layout.transition.duration}, box-shadow ${layout.transition.duration};
	border-radius: ${layout.radius.ui};
	cursor: pointer;

	&:hover,
	&:focus {
		color: ${theme.default.primary};
		box-shadow: inset 0 0 0 1px ${theme.default.primary};
		outline: none;

		svg {
			transform: scale(1.4);
		}
	}

	svg {
		transition: transform ${layout.transition.duration};
	}
`;

const ItemLabel = styled.span`
	display: block;
	margin-top: 4px;
	overflow: hidden;
	font-size: 10px;
	width: 100%;

	strong {
		color: ${theme.default.primary};
	}
`;

const Placeholder = styled.p`
	text-align: center;
	margin: 0;
	padding: 3em 0;
`;
