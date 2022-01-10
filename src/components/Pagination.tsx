/**
 * External dependencies
 */
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { theme } from '../utils/constants';
import Icon from './Icon';

// interface CategoryProps {
// 	categoryPlaceHolder: string;
// 	category?: string;
// 	setCategory: React.Dispatch<React.SetStateAction<string>>;
// }

const Pagination = () => {
	return (
		<Container className="react-icons-picker-pagination">
			<Pager className="react-icons-picker-pagination__pager">
				<Input type="number" className="react-icons-picker-pagination__input" min="1" /> / 30
			</Pager>
			<Arrow className="react-icons-picker-pagination__arrow" aria-label="Prev">
				<Icon value="FaChevronLeft" />
			</Arrow>
			<Arrow className="react-icons-picker-pagination__arrow" aria-label="Next">
				<Icon value="FaChevronRight" />
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
	border-bottom: 1px solid ${theme.color.gray.secondary};
	transition: border-color ${theme.transition.duration}, box-shadow ${theme.transition.duration};
	appearance: none;
	border-radius: 0;
	color: inherit;
	width: calc(3em + 8px);
	margin: 0;
	-moz-appearance: textfield;

	&:focus {
		outline: 2px transparent;
		border-color: ${theme.color.primary};
		box-shadow: 0 1px ${theme.color.primary};
	}

	&::placeholder {
		color: ${theme.color.gray.secondary};
	}

	&:-ms-input-placeholder {
		color: ${theme.color.gray.secondary};
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
	background: ${theme.color.primary};
	transition: color ${theme.transition.duration}, background ${theme.transition.duration};
	border-radius: ${theme.radius.ui};
	cursor: pointer;

	&:hover {
		background: ${theme.color.darker};
	}
	&:focus {
		box-shadow: 0 0 0 2px ${theme.color.primary}, inset 0 0 0 1px #fff;
		outline: 1px solid transparent;
	}
`;
