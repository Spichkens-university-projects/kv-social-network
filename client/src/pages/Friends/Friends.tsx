'use client';

import RightSidebar from '@/components/layout/RightSidebar/RightSidebar';
import FriendsList from '@/components/ui/friends/FriendsList/FriendsList';
import RelationsSelector from '@/components/ui/friends/RelationSelector/RelationsSelector';

const Friends = () => {
	return (
		<>
			<FriendsList />
			<RightSidebar>
				<RelationsSelector />
			</RightSidebar>
		</>
	);
};

export default Friends;
