import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

function useClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, callback: () => void | undefined) {
	const handleClickOutside = (event: Event) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			event.stopPropagation();
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [ref, callback]);
}

export default useClickOutside;
