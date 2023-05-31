'use client';

import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
	return (
		<div className={'h-full w-full flex items-center justify-center'}>
			<TailSpin
				height='30'
				width='30'
				color='#0077B5'
				ariaLabel='tail-spin-loading'
				radius='1'
			/>
		</div>
	);
};

export default Loader;
