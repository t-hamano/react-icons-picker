/**
 * External dependencies
 */
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { theme, layout } from '../utils/constants';

interface SearchProps {
	searchPlaceholder: string;
	focusOnSearch?: boolean;
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchPlaceholder, focusOnSearch, query, setQuery }: SearchProps) => {
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (ref.current && focusOnSearch) {
			ref.current.focus();
		}
	}, []);

	const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		setQuery(query);
	};

	return (
		<Container className="react-icons-picker-search">
			<Input
				type="text"
				className="react-icons-picker-search__input"
				placeholder={searchPlaceholder}
				value={query}
				onChange={onSearch}
				ref={ref}
			/>
		</Container>
	);
};

export default Search;

const Container = styled.div`
	margin-bottom: 8px;
`;

const Input = styled.input`
	width: 100%;
	font-size: inherit;
	font-family: inherit;
	padding: 4px;
	background-color: transparent;
	border: none;
	border-bottom: 1px solid ${theme.default.gray.secondary};
	transition: border-color ${layout.transition.duration}, box-shadow ${layout.transition.duration};
	appearance: none;
	border-radius: 0;
	color: inherit;

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
`;
