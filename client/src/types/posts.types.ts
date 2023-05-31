import { IUser } from '@/types/users.types';

export interface IPost {
	_id: string;
	author: IUser;
	description: string;
	content: string[];
	likes: IUser[];
	comments: IComment[];
	createdAt: Date;
	updatedAt: Date;
	isLiked: boolean;
}

export interface GetAllPostsArgs {
	limit?: number;
	page?: number;
}

export interface CreatePostDto {
	content?: string[];
	description?: string;
}

export interface IComment {
	_id: string;
	post: IPost;
	commentator: IUser;
	commentText: string;
	createdAt: Date;
}
