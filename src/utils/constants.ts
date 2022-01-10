/**
 * Color themes
 */
export const theme = {
	default: {
		font: '#1e1e1e',
		primary: '#007cba',
		darker: '#006ba1',
		danger: {
			primary: '#cc1818',
			secondary: '#710d0d',
		},
		gray: {
			primary: '#1e1e1e',
			secondary: '#949494',
			tertiary: '#f0f0f0',
		},
	},
} as const;

/**
 * Common style definitions for components.
 */
export const layout = {
	radius: {
		ui: '2px',
	},
	fontSize: {
		default: '12px',
	},
	transition: {
		duration: '0.2s',
	},
} as const;
