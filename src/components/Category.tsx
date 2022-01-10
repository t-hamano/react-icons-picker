/**
 * External dependencies
 */
import styled from 'styled-components';
/* @ts-ignore */
import { IconsManifest } from 'react-icons';

/**
 * Internal dependencies
 */
import { theme, layout } from '../utils/constants';
import Icon from './Icon';

interface CategoryProps {
	categoryPlaceHolder: string;
	category?: string;
	setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Category = ({ categoryPlaceHolder, category, setCategory }: CategoryProps) => {
	const iconCategories = IconsManifest.sort((a: IconsManifest, b: IconsManifest) =>
		a.name > b.name ? 1 : -1
	);

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(event.target.value);
	};

	return (
		<Container className="react-icons-picker-category">
			<Select onChange={onChange} value={category}>
				<option value="">{categoryPlaceHolder}</option>
				{iconCategories.map((category: IconsManifest) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</Select>
			<Arrow value="FaChevronDown" className="react-icons-picker-search__Arrow" />
		</Container>
	);
};

export default Category;

const Container = styled.div`
	position: relative;
	margin-bottom: 8px;
`;

const Select = styled.select`
	width: 100%;
	font-size: inherit;
	font-family: inherit;
	padding: 4px;
	background-color: transparent;
	border: none;
	border-bottom: 1px solid ${theme.default.gray.secondary};
	transition: border-color ${layout.transition.duration}, box-shadow ${layout.transition.duration};
	appearance: none;
	color: inherit;

	&:focus {
		outline: 2px transparent;
		border-color: ${theme.default.primary};
		box-shadow: 0 1px ${theme.default.primary};
	}
`;

const Arrow = styled(Icon)`
	position: absolute;
	right: 8px;
	top: 50%;
	transform: translateY(-50%);
	font-size: 0.8em;
`;
