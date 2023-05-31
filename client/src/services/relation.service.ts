import { axiosWithToken } from '@/axios/axios';
import { IOtherUser } from '@/types/relation.types';


export const RelationService = {
	async getFriends(): Promise<IOtherUser[]> {
		const response = await axiosWithToken.get(`/friends`);
		return response.data;
	},

	async getSubscribers(): Promise<IOtherUser[]> {
		const response = await axiosWithToken.get(`/friends/subscribers`);
		return response.data;
	},

	async getSubscriptions(): Promise<IOtherUser[]> {
		const response = await axiosWithToken.get(`/friends/subscriptions`);
		return response.data;
	},

	async sendFriendRequest(otherUserId: string) {
		const response = await axiosWithToken.post(`/friends/send/${otherUserId}`);
		return response.data;
	},

	async acceptFriendRequest(otherUserId: string) {
		const response = await axiosWithToken.patch(`/friends/accept/${otherUserId}`);
		return response.data;
	},

	async rejectFriendRequest(otherUserId: string) {
		const response = await axiosWithToken.patch(`/friends/reject/${otherUserId}`);
		return response.data;
	},

	async removeFriend(otherUserId: string) {
		const response = await axiosWithToken.delete(`/friends/remove/${otherUserId}`);
		return response.data;
	},

	async sendSubscriptionRequest(otherUserId: string) {
		const response = await axiosWithToken.post(`/subscriptions/send/${otherUserId}`);
		return response.data;
	}
};
