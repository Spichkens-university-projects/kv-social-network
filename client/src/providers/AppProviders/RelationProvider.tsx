import { useEffect } from 'react';

import { useRelationActions } from '@/hooks/actions/useRelationActions';

const RelationProvider = () => {
	const { getFriends, getSubscribers, getSubscriptions } = useRelationActions();
	useEffect(() => {
		getSubscriptions();
		getSubscribers();
		getFriends();
	}, []);

	return null;
};

export default RelationProvider;
