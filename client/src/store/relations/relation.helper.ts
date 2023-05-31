import { IOtherUser } from '@/types/relation.types';

export const RelationHelper = {
	filterState(state: IOtherUser[], userIdToRemove: string): IOtherUser[] {
		return state.filter(user => user._id !== userIdToRemove);
	}
};
