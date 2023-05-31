import { axiosClassic, axiosWithToken } from '@/axios/axios';

import { CreatePostDto, GetAllPostsArgs, IPost } from '@/types/posts.types';

export const PostService = {
	async createPost({ description, content }: CreatePostDto) {
		const response = await axiosWithToken.post<IPost>('/posts/create', { description, content });
		return response.data;
	},

	async deletePost(postId: string) {
		const response = await axiosWithToken.delete<IPost>(`/posts/delete/${postId}`);
		return response.data;
	},

	async getAllPosts({ page, limit }: GetAllPostsArgs) {
		const response = await axiosClassic.get<IPost[]>('/posts', {
			params: { page, limit }
		});
		return response.data;
	},

	async getLikedByCurrentUserPosts() {
		const response = await axiosWithToken.get<IPost[]>('/likes/get-liked-posts');
		return response.data;
	},

	async likePost(postId: string) {
		const response = await axiosWithToken.put<IPost>(`/likes/set-like/${postId}`);
		return response.data;
	}
};
