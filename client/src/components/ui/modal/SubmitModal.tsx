import styles from './SubmitModal.module.scss';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC, useRef } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import Button from '@/components/ui/primitives/buttons/SubmitButton/Button';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import useClickOutside from '@/hooks/local/useOnClickOutside';
import { useModalState } from '@/hooks/states/useModalState';

import { closeModal } from '@/store/modal/modal.slice';

interface SubmitModalProps {
	title: string;
	description: string;
	cb: () => void;
	cbButtonText: string;
}

const SubmitModal: FC<SubmitModalProps> = ({ cb, title, description, cbButtonText }) => {
	const dispatch = useTypedDispatch();
	const { isOpen } = useModalState();
	const ref = useRef<HTMLDivElement>(null);
	const [animationRef] = useAutoAnimate();

	const handleCloseModal = () => {
		dispatch(closeModal());
	};

	useClickOutside(ref, handleCloseModal);

	return isOpen ? (
		<div className={styles.screen}>
			<VStack ref={animationRef} className={styles.container}>
				<VStack>
					<p className={styles.title}>{title}</p>
					<p className={styles.description}>{description}</p>
				</VStack>
				<HStack className={styles.buttons}>
					<Button variant={'secondary'} onClick={handleCloseModal}>
						Отмена
					</Button>
					<Button variant={'red'} onClick={cb}>
						{cbButtonText}
					</Button>
				</HStack>
			</VStack>
		</div>
	) : null;
};

export default SubmitModal;
