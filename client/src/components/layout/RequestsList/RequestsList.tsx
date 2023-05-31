import styles from './RequestsList.module.scss';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import RequestListItem from '@/components/layout/RequestsList/RequestListItem/RequestListItem';
import DotCounter from '@/components/ui/primitives/DotCounter/DotCounter';
import EmptyListPlug from '@/components/ui/primitives/blocks/EmptyListPlug/EmptyListPlug';

import { useRelationsState } from '@/hooks/states/useRelationsState';

const RequestsList = () => {
	const [animateRef] = useAutoAnimate();
	const { subscribers } = useRelationsState();
	return (
		<VStack ref={animateRef} className={styles.container}>
			<HStack className={styles.label}>
				<span>Запросы</span>
				<DotCounter number={subscribers.length} />
			</HStack>
			{subscribers.length ? (
				<>
					{subscribers.map(subscriber => (
						<RequestListItem subscriber={subscriber} key={subscriber._id} />
					))}
				</>
			) : (
				<EmptyListPlug text={'Нет запросов в друзья'} />
			)}
		</VStack>
	);
};

export default RequestsList;
