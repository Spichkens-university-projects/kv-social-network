import * as authActions from '@/store/auth/auth.actions';
import * as chatActions from '@/store/chats/chat.actions';
import * as postActions from '@/store/posts/post.actions';
import * as relationActions from '@/store/relations/relations.actions';

export const AuthActions = {
	...authActions
};

export const PostActions = {
	...postActions
};

export const RelationActions = {
	...relationActions
};

export const ChatActions = {
	...chatActions
};
