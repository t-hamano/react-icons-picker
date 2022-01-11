/**
 * External dependencies
 */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { darken } from 'polished';

/**
 * Internal dependencies
 */
import Icon from './Icon';
import type { Theme } from './IconPicker';
import type { IconValues } from '../utils/icon';

interface PreviewProps {
	value: IconValues | undefined;
	noSelectedPlaceholder: string;
	onChange: (value: IconValues | undefined) => void;
	theme: Theme;
}

const Preview = ({ value, noSelectedPlaceholder, onChange, theme }: PreviewProps) => {
	return (
		<ThemeProvider theme={theme}>
			<Container className="react-icons-picker-preview">
				{value ? (
					<>
						<Icon value={value} />
						<Label className="react-icons-picker-preview__label">{value}</Label>
						<Reset
							className="react-icons-picker-preview__reset"
							aria-label="Reset"
							value={value}
							onClick={() => onChange(undefined)}
						>
							<Icon value={'FaTimes'} />
						</Reset>
					</>
				) : (
					<Noselect className="react-icons-picker-preview__noselect">
						{noSelectedPlaceholder}
					</Noselect>
				)}
			</Container>
		</ThemeProvider>
	);
};

export default Preview;

const Container = styled.div`
	margin-bottom: 8px;
	display: flex;
	height: 24px;
	font-size: 24px;
	align-items: center;
	justify-content: center;
`;

const Label = styled.div`
	margin: 0 16px;
	font-size: 12px;
	overflow: hidden;
	flex: 1;
`;

const Reset = styled((props) => <button {...props} />)`
	display: flex;
	font-size: 12px;
	align-items: center;
	justify-content: center;
	color: #fff;
	width: 20px;
	height: 20px;
	border: none;
	padding: 0;
	margin: 0 0 0 auto;
	background: ${(props) => props.theme.alert};
	transition: background 0.2s;
	border-radius: 2px;
	cursor: pointer;

	&:hover {
		background: ${(props) => darken(0.1, props.theme.alert)};
	}

	&:focus {
		box-shadow: 0 0 0 2px ${(props) => props.theme.alert}, inset 0 0 0 1px #fff;
		outline: 1px solid transparent;
	}
`;

const Noselect = styled.p`
	font-size: 12px;
`;
