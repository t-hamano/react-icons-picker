/**
 * External dependencies
 */
import * as AllIcons from 'react-icons/all';
import type { Property } from 'csstype';

export interface IconProps {
	value: keyof typeof AllIcons;
	size?: Property.Width;
}

const Icon = ({ value, size, ...props }: IconProps) => {
	if (value in AllIcons === false) {
		return null;
	}

	const Icon = AllIcons[value as keyof typeof AllIcons];

	return <Icon size={size} {...props} />;
};

export default Icon;
