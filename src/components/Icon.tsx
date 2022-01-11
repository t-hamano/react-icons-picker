/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { allIcons } from '../utils/icon';

export interface IconProps {
	value: string;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	[x: string]: any;
}

const Icon = ({ value, ...props }: IconProps) => {
	if (value in allIcons === false) {
		return null;
	}

	const Icon = allIcons[value as keyof typeof allIcons];

	return <Icon {...props} />;
};

export default Icon;
