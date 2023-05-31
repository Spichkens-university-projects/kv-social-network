import { useEffect, useState } from 'react';

type CallbackFunction = () => void;

const useKeyPress = (targetKey: string, callback?: () => void): boolean => {
	const [keyPressed, setKeyPressed] = useState<boolean>(false);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === targetKey) {
				event.preventDefault();
				setKeyPressed(true);
				if (callback) {
					callback();
				}
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			event.preventDefault();
			if (event.key === targetKey) {
				setKeyPressed(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [targetKey, callback]);

	return keyPressed;
};

export default useKeyPress;
