import React, { useState, useEffect, useRef } from 'react';

export interface IconPickerProps {
	value: string;
	showSearch?: boolean;
	onChange: (value: any) => void;
}

const IconPicker = ({ value, showSearch = true }: IconPickerProps) => {
	const ref = useRef<HTMLElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		function handleClickOutside(event: Event) {
			if (
				event.target instanceof HTMLElement &&
				ref.current &&
				!ref.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		}
		document.addEventListener('click', {
			handleEvent: handleClickOutside,
		});
		return () => {
			document.removeEventListener('click', {
				handleEvent: handleClickOutside,
			});
		};
	}, [ref]);

	return <div className="reactIconPicker">IconPicker:{value}</div>;
};

export default IconPicker;
