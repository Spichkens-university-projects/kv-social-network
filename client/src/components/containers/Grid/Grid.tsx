import { FC, ReactNode } from 'react';

interface GridProps {
	children: ReactNode;
	cols: number;
	rows?: number;
}

const Grid: FC<GridProps> = ({ cols, rows, children }) => {
	return <div className={`grid grid-cols-${cols} grid-rows-${rows}`}>{children}</div>;
};

export default Grid;
