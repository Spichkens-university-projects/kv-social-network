import { POSTS_LIST_COUNT_LIMIT } from '@/utils/constants/lists.constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getPostsWithLikes } from '@/store/posts/post.actions';

import { IPost } from '@/types/posts.types';

export interface PostsStoreInitialState {
	posts: IPost[];
	isLoading: boolean;
	moreOnServer: boolean;
	selectedPost: IPost | null;
}

const initialState: PostsStoreInitialState = {
	posts: [],
	moreOnServer: true,
	isLoading: false,
	selectedPost: null
};

export const postSlice = createSlice({
	name: 'posts-reducer',
	initialState,
	reducers: {
		addPost: (state, { payload }: PayloadAction<IPost>) => {
			state.posts.push(payload);
		},
		deletePost: (state, { payload }: PayloadAction<IPost>) => {
			state.posts = state.posts.filter(post => post._id !== payload._id);
		},
		setPosts: (state, { payload }: PayloadAction<IPost[]>) => {
			state.posts.push(...payload);
			state.moreOnServer = payload.length === POSTS_LIST_COUNT_LIMIT;
		},
		updatePostLike: (state, action: PayloadAction<{ likedPost: IPost; isLiked: boolean }>) => {
			const { likedPost, isLiked } = action.payload;
			const likedPostIndex = state.posts.findIndex(post => post._id === likedPost._id);
			const currentState = state.posts[likedPostIndex].isLiked;
			if (likedPostIndex !== -1) {
				state.posts[likedPostIndex].likes = likedPost.likes;
				state.posts[likedPostIndex].isLiked = !currentState;
			}
		},
		addComment: (state, { payload }: PayloadAction<IPost>) => {
			const postIndex = state.posts.findIndex(post => post._id === payload._id);
			state.posts[postIndex] = { ...state.posts[postIndex], comments: payload.comments };
		},
		selectPost: (state, { payload }: PayloadAction<IPost | null>) => {
			state.selectedPost = payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(getPostsWithLikes.pending, state => {});
	}
});

export const { setPosts, updatePostLike, addPost, deletePost, addComment } = postSlice.actions;
export default postSlice.reducer;
