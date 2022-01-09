/**
 * External dependencies
 */
import * as AllIcons from 'react-icons/all';

export interface IconProps {
	value: keyof typeof AllIcons;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	[x: string]: any;
}

const Icon = ({ value, ...props }: IconProps) => {
	if (value in AllIcons === false) {
		return null;
	}

	const Icon = AllIcons[value as keyof typeof AllIcons];

	return <Icon {...props} />;
};

export default Icon;
