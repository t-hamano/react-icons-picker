/**
 * External dependencies
 */
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { theme, layout } from '../utils/constants';
import Icon from './Icon';

interface PaginationProps {
	pageInfo: { currentPage: number | undefined; perPage: number; maxPage: number };
	setPageInfo: React.Dispatch<
		React.SetStateAction<{ currentPage: number | undefined; perPage: number; maxPage: number }>
	>;
}

const Pagination = ({ pageInfo, setPageInfo }: PaginationProps) => {
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
				aria-label="Prev"
				disabled={!pageInfo.currentPage || pageInfo.currentPage === 1}
			>
				<Icon value="FaChevronLeft" onClick={() => onClickArrow(-1)} />
			</Arrow>
			<Arrow
				className="react-icons-picker-pagination__arrow"
				aria-label="Next"
				disabled={pageInfo.currentPage && pageInfo.currentPage >= pageInfo.maxPage}
			>
				<Icon value="FaChevronRight" onClick={() => onClickArrow(1)} />
			</Arrow>
		</Container>
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
	font-size: inherit;
	font-family: inherit;
	padding: 4px;
	background-color: transparent;
	border: none;
	border-bottom: 1px solid ${theme.default.gray.secondary};
	transition: border-color ${layout.transition.duration}, box-shadow ${layout.transition.duration};
	appearance: none;
	text-align: right;
	border-radius: 0;
	color: inherit;
	width: calc(3em + 8px);
	margin: 0;
	-moz-appearance: textfield;

	&:focus {
		outline: 2px transparent;
		border-color: ${theme.default.primary};
		box-shadow: 0 1px ${theme.default.primary};
	}

	&::placeholder {
		color: ${theme.default.gray.secondary};
	}

	&:-ms-input-placeholder {
		color: ${theme.default.gray.secondary};
	}

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		appearance: none;
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
	font-size: 14px;
	margin: 0 0 0 8px;
	background: ${theme.default.primary};
	transition: color ${layout.transition.duration}, background ${layout.transition.duration};
	border-radius: ${layout.radius.ui};
	cursor: pointer;

	&:hover {
		background: ${theme.default.darker};
	}
	&:focus {
		box-shadow: 0 0 0 2px ${theme.default.primary}, inset 0 0 0 1px #fff;
		outline: 1px solid transparent;
	}

	&[disabled] {
		background: ${theme.default.gray.tertiary};
		pointer-events: none;
	}
`;
