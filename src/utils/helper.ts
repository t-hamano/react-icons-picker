/**
 * External dependencies
 */
import type { CSSProperties } from 'react';

/**
 * Utility used to compute the popover position styles.
 */
export function getPopoverPositionStyles(anchorRect: DOMRect, position: string): CSSProperties {
	const positionStyles: CSSProperties = {};

	const positionX =
		position.split(' ').filter((string) => ['left', 'center', 'right'].includes(string))?.[0] ||
		'center';
	const positionY =
		position.split(' ').filter((string) => ['top', 'middle', 'bottom'].includes(string))?.[0] ||
		'middle';

	if (positionX === 'left') {
		positionStyles.right = `${anchorRect.width + 10}px`;
	} else if (positionX === 'center') {
		positionStyles.left = '50%';
	} else {
		positionStyles.left = `${anchorRect.width + 10}px`;
	}

	if (positionY === 'top') {
		positionStyles.bottom = `${anchorRect.height + 10}px`;
	} else if (positionY === 'middle') {
		positionStyles.top = '50%';
	} else {
		positionStyles.top = `${anchorRect.height + 10}px`;
	}
	if (positionX === 'center' && positionY === 'middle') {
		positionStyles.transform = 'translate(-50%,-50%)';
	} else if (positionX === 'center') {
		positionStyles.transform = 'translateX(-50%)';
	} else if (positionY === 'middle') {
		positionStyles.transform = 'translateY(-50%)';
	}

	return positionStyles;
}
