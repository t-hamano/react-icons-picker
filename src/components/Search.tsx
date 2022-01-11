/**
 * External dependencies
 */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lighten } from 'polished';

/**
 * Internal dependencies
 */
import type { Theme } from './IconPicker';

interface SearchProps {
	searchPlaceholder: string;
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	theme: Theme;
}

const Search = ({ searchPlaceholder, query, setQuery, theme }: SearchProps) => {
	const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		setQuery(query);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container className="react-icons-picker-search">
				<Input
					type="text"
					className="react-icons-picker-search__input"
					placeholder={searchPlaceholder}
					value={query}
					onChange={onSearch}
				/>
			</Container>
		</ThemeProvider>
	);
};

export default Search;

const Container = styled.div`
	margin-bottom: 8px;
`;

const Input = styled.input`
	&& {
		width: 100%;
		font-size: inherit;
		font-family: inherit;
		padding: 4px;
		background-color: transparent;
		border: none;
		border-bottom: 1px solid ${(props) => props.theme.primary};
		transition: border-color 0.2s, box-shadow 0.2s;
		appearance: none;
		border-radius: 0;
		color: inherit;

		&:focus {
			outline: 2px transparent;
			border-color: ${(props) => props.theme.accent};
			box-shadow: 0 1px ${(props) => props.theme.accent};
		}

		&::placeholder {
			color: ${(props) => lighten(0.4, props.theme.primary)};
		}

		&:-ms-input-placeholder {
			color: ${(props) => lighten(0.4, props.theme.primary)};
		}
	}
`;
