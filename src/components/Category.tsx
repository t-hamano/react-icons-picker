/**
 * External dependencies
 */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

/**
 * Internal dependencies
 */
import Icon from './Icon';
import { iconCategories } from '../utils/icon';
import type { Theme } from './IconPicker';

interface CategoryProps {
	categoryPlaceHolder: string;
	category?: string;
	setCategory: React.Dispatch<React.SetStateAction<string>>;
	theme: Theme;
}

const Category = ({ categoryPlaceHolder, category, setCategory, theme }: CategoryProps) => {
	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(event.target.value);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container className="react-icons-picker-category">
				<Select onChange={onChange} value={category}>
					<option value="">{categoryPlaceHolder}</option>
					{iconCategories.map((category: typeof iconCategories) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</Select>
				<Arrow value="FaChevronDown" className="react-icons-picker-search__Arrow" />
			</Container>
		</ThemeProvider>
	);
};

export default Category;

const Container = styled.div`
	position: relative;
	margin-bottom: 8px;
`;

const Select = styled.select`
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
		color: inherit;
		border-radius: 0;

		&:focus {
			outline: 2px transparent;
			border-color: ${(props) => props.theme.accent};
			box-shadow: 0 1px ${(props) => props.theme.accent};
		}
	}
`;

const Arrow = styled(Icon)`
	position: absolute;
	right: 8px;
	top: 50%;
	transform: translateY(-50%);
	font-size: 0.8em;
`;
