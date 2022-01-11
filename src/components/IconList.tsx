/**
 * External dependencies
 */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import type { Icons, IconValues } from '../utils/icon';
import type { Theme } from './IconPicker';

interface IconListProps {
	value: IconValues | undefined;
	iconList: Icons;
	pageInfo: { currentPage: number | undefined; perPage: number };
	query: string;
	showIconLabel: boolean;
	highlightMatchedString: boolean;
	noIconPlaceholder: string;
	onChange: (value: IconValues | undefined) => void;
	theme: Theme;
}

const IconList = ({
	value,
	iconList,
	pageInfo,
	query,
	showIconLabel,
	highlightMatchedString,
	noIconPlaceholder,
	onChange,
	theme,
}: IconListProps) => {
	const offset = pageInfo.perPage * ((pageInfo.currentPage || 1) - 1);
	const filteredIconList = iconList.slice(offset, offset + pageInfo.perPage);

	// Highlight text that matches the query in the icon label.
	const highlightedLabel = (label: IconValues) => {
		if (query.length && highlightMatchedString) {
			const hightlightPattern = new RegExp(`(${query})`, 'i');
			return label
				.split(hightlightPattern)
				.map((part) => (part.match(hightlightPattern) ? <strong>{part}</strong> : part));
		}
		return label;
	};

	const onClick = (label: IconValues) => {
		onChange(value && label === value ? undefined : label);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container className="react-icons-picker-icon-list">
				{filteredIconList.length ? (
					<List className="react-icons-picker-icon-list__list">
						{filteredIconList.map((icon, index) => {
							return (
								<Item key={index} className="react-icons-picker-icon-list__item">
									<ItemButton
										className={classNames('react-icons-picker-icon-list__item-button', {
											'react-icons-picker-icon-list__item-button--selected': value === icon.label,
										})}
										aria-label={icon.label}
										title={icon.label}
										isSelected={value === icon.label}
										onClick={() => onClick(icon.label)}
									>
										{typeof icon.element === 'function' && icon.element({ size: '24px' })}
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
		</ThemeProvider>
	);
};

export default IconList;

const Container = styled.div``;

const List = styled.div`
	display: flex;
	flex-wrap: wrap;
	text-align: center;
	gap: 4px;
`;

const Item = styled.div`
	width: 80px;
`;

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
const ItemButton = styled(({ isSelected, ...props }: { isSelected: boolean; [x: string]: any }) => (
	<button {...props} />
))`
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;
	font-family: inherit;
	width: 100%;
	border: none;
	padding: 8px;
	margin: 0;
	background: transparent;
	transition: border-color 0.2s, box-shadow 0.2s;
	border-radius: 2px;
	cursor: pointer;
	color: ${(props) => (props.isSelected ? props.theme.accent : 'inherit')};

	&:hover,
	&:focus {
		color: ${(props) => props.theme.accent};
		box-shadow: inset 0 0 0 1px ${(props) => props.theme.accent};
		outline: none;
	}

	&:hover {
		svg {
			transform: scale(1.4);
		}
	}

	svg {
		transition: transform 0.2s;
	}
`;

const ItemLabel = styled.span`
	display: block;
	margin-top: 4px;
	overflow: hidden;
	font-size: 10px;
	width: 100%;

	strong {
		color: ${(props) => props.theme.accent};
	}
`;

const Placeholder = styled.p`
	text-align: center;
	margin: 0;
	padding: 3em 0;
`;
