/**
 * External dependencies
 */
import type { CSSProperties } from 'react';

/**
 * Utility used to compute the popover position styles.
 *
 * @param {Object}  anchorRect Anchor Rect.
 * @param {string}  positionX  Desired xaxis position.
 * @param {string}  positionY  Desired yaxis position.
 *
 * @return {Object} Popover position CSS properties.
 */
export function getPopoverPositionStyles(
	anchorRect: DOMRect,
	positionX: 'left' | 'center' | 'right',
	positionY: 'top' | 'middle' | 'bottom'
) {
	const positionStyles: CSSProperties = {};

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
