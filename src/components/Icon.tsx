/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { allIcons } from '../utils/icon';
import type { IconValues } from '../utils/icon';

export interface IconProps {
	value: IconValues;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	[x: string]: any;
}

const Icon = ({ value, ...otherProps }: IconProps) => {
	if (value in allIcons === false) {
		return null;
	}

	const Icon = allIcons[value as keyof typeof allIcons];

	return <Icon {...otherProps} />;
};

export default Icon;
