import * as React from 'react';

export interface IconProps {
	value: string;
}

const Icon = ({ value }: IconProps) => {
	return <div className="reactIconPicker">Icon:{value}</div>;
};

export default Icon;
