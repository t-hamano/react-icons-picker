/**
 * External dependencies
 */
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { theme } from '../utils/constants';

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
	font-size: ${theme.fontSize.default};
	font-family: inherit;
	padding: 4px;
	margin-bottom: 4px;
	border: none;
	border-bottom: 1px solid ${theme.color.gray.secondary};
	transition: border-color ${theme.transition.duration}, box-shadow ${theme.transition.duration};

	&:focus {
		outline: 2px transparent;
		border-color: ${theme.color.primary};
		box-shadow: 0 1px ${theme.color.primary};
	}
`;
