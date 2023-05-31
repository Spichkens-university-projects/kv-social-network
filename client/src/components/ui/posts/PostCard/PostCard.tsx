import styles from './PostCard.module.scss';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC, memo, useState } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import CommentButton from '@/components/ui/posts/CommentButton/CommentButton';
import CommentList from '@/components/ui/posts/Comments/CommentList';
import CreateCommentBlock from '@/components/ui/posts/Comments/CreateCommentBlock';
import LikeButton from '@/components/ui/posts/LikeButton/LikeButton';
import PostContent from '@/components/ui/posts/PostCard/PostContent/PostContent';

import { IPost } from '@/types/posts.types';

interface PostCardProps {
	post: IPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
	const [ref] = useAutoAnimate();

	const [areCommentsShown, setCommentsShown] = useState(false);

	const toggleShowComments = () => {
		setCommentsShown(prev => !prev);
	};

	return (
		<VStack className={styles.container} ref={ref}>
			<PostContent post={post} />
			<HStack className={styles.buttons}>
				<LikeButton post={post} />
				<CommentButton comments={post.comments} setCommentsShown={toggleShowComments} />
			</HStack>
			{areCommentsShown ? (
				<>
					<hr />
					<CommentList comments={post.comments} />
					<hr />
					<CreateCommentBlock postId={post._id} />
				</>
			) : null}
		</VStack>
	);
};

PostCard.displayName = 'PostCard';

export default memo(PostCard);
