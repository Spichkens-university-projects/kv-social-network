import { axiosWithToken } from '@/axios/axios';

import { IPost } from '@/types/posts.types';

export const CommentService = {
	async createComment({ commentText, postId }: { postId: string; commentText: string }) {
		const response = await axiosWithToken.patch<IPost>('/comments/create', {
			commentText,
			postId
		});
		return response.data;
	}
};
