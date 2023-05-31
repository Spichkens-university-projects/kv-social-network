'use client';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { PostService } from '@/services/post.service';

import { setPosts, updatePostLike } from '@/store/posts/post.slice';

import { GetAllPostsArgs } from '@/types/posts.types';

export const getPostsWithLikes = createAsyncThunk<void, GetAllPostsArgs>(
	'/post/getLikedPosts',
	async ({ page, limit }, thunkAPI) => {
		try {
			let allPosts = await PostService.getAllPosts({ page, limit });
			const likedPosts = await PostService.getLikedByCurrentUserPosts();
			const postWithLikes = allPosts.map(post => ({
				...post,
				isLiked: likedPosts.some(likedPost => likedPost._id === post._id)
			}));

			thunkAPI.dispatch(setPosts(postWithLikes));
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e);
		}
	}
);

export const togglePostLike = createAsyncThunk<
	void,
	{
		postId: string;
		isLiked: boolean;
	}
>('/post/getLikedPosts', async ({ postId, isLiked }, thunkAPI) => {
	try {
		const likedPost = await PostService.likePost(postId);
		thunkAPI.dispatch(updatePostLike({ likedPost, isLiked: likedPost.isLiked }));
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e);
	}
});
