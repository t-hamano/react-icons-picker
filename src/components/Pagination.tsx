/**
 * External dependencies
 */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { darken, lighten } from 'polished';

/**
 * Internal dependencies
 */
import Icon from './Icon';
import type { Theme } from './IconPicker';

interface PaginationProps {
	pageInfo: { currentPage: number | undefined; perPage: number; maxPage: number };
	setPageInfo: React.Dispatch<
		React.SetStateAction<{ currentPage: number | undefined; perPage: number; maxPage: number }>
	>;
	theme: Theme;
}

const Pagination = ({ pageInfo, setPageInfo, theme }: PaginationProps) => {
	const onPagerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const parsedValue = parseInt(value);
		setPageInfo({
			...pageInfo,
			currentPage: value ? (isNaN(parsedValue) ? 1 : parsedValue) : undefined,
		});
	};

	const onClickArrow = (offset: number) => {
		const newCurrentPage = (pageInfo.currentPage || 1) + offset;
		if (newCurrentPage === 0) return;
		setPageInfo({
			...pageInfo,
			currentPage: newCurrentPage,
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container className="react-icons-picker-pagination">
				<Pager className="react-icons-picker-pagination__pager">
					<Input
						type="number"
						className="react-icons-picker-pagination__input"
						min="1"
						max={pageInfo.maxPage}
						value={pageInfo.currentPage}
						onChange={onPagerChange}
					/>
					/ {pageInfo.maxPage}
				</Pager>
				<Arrow
					className="react-icons-picker-pagination__arrow"
					aria-label="Previous Page"
					disabled={!pageInfo.currentPage || pageInfo.currentPage === 1}
					onClick={() => onClickArrow(-1)}
				>
					<Icon size="14px" value={'FaChevronLeft'} />
				</Arrow>
				<Arrow
					className="react-icons-picker-pagination__arrow"
					aria-label="Next Page"
					disabled={pageInfo.currentPage && pageInfo.currentPage >= pageInfo.maxPage}
					onClick={() => onClickArrow(1)}
				>
					<Icon size="14px" value={'FaChevronRight'} />
				</Arrow>
			</Container>
		</ThemeProvider>
	);
};

export default Pagination;

const Container = styled.div`
	margin-bottom: 8px;
	display: flex;
	align-items: center;
`;

const Pager = styled.div`
	width: 100px;
	margin-right: auto;
`;

const Input = styled.input`
	&& {
		font-size: inherit;
		font-family: inherit;
		padding: 4px;
		background-color: transparent;
		border: none;
		border-bottom: 1px solid ${(props) => props.theme.primary};
		transition: border-color 0.2s, box-shadow 0.2s;
		appearance: none;
		text-align: right;
		border-radius: 0;
		color: inherit;
		width: calc(3em + 8px);
		margin: 0;
		-moz-appearance: textfield;

		&:focus {
			outline: 2px transparent;
			border-color: ${(props) => props.theme.accent};
			box-shadow: 0 1px ${(props) => props.theme.accent};
		}

		&::-webkit-inner-spin-button,
		&::-webkit-outer-spin-button {
			appearance: none;
		}
	}
`;

const Arrow = styled((props) => <button {...props} />)`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-family: inherit;
	width: 26px;
	height: 26px;
	border: none;
	padding: 0;
	margin: 0 0 0 8px;
	background: ${(props) => props.theme.accent};
	transition: color 0.2s, background 0.2s;
	border-radius: 2px;
	cursor: pointer;

	&:hover {
		background: ${(props) => darken(0.1, props.theme.accent)};
	}
	&:focus {
		box-shadow: 0 0 0 2px ${(props) => props.theme.accent}, inset 0 0 0 1px #fff;
		outline: 1px solid transparent;
	}

	&[disabled] {
		background: ${(props) => lighten(0.4, props.theme.primary)};
		pointer-events: none;
	}
`;
