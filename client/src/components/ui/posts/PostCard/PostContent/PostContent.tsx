import styles from './PostContent.module.scss';
import { concatName } from '@/utils/helpers/concatName';
import { getRelativeTime } from '@/utils/helpers/dayjs.helper';
import { FC } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import PostImages from '@/components/ui/posts/PostCard/PostImages/PostImages';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';
import CrossButton from '@/components/ui/primitives/buttons/CrossButton/CrossButton';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import { useAuthState } from '@/hooks/states/useAuthState';

import { PostService } from '@/services/post.service';

import { deletePost } from '@/store/posts/post.slice';

import { IPost } from '@/types/posts.types';

interface PostContentProps {
	post: IPost;
}

const PostContent: FC<PostContentProps> = ({
	post: { _id, author, content, createdAt, description }
}) => {
	const dispatch = useTypedDispatch();
	const { currentUser } = useAuthState();

	const handleDeletePost = () => {
		PostService.deletePost(_id).then(res => dispatch(deletePost(res)));
	};

	return (
		<>
			<HStack className={styles.authorBlock}>
				<CustomImage
					width={120}
					height={120}
					alt={'user-avatar'}
					src={author.avatar}
					className={styles.avatar}
				/>
				<VStack className={'w-full'}>
					<p className={styles.authorName}>{concatName(author)}</p>
					<p className={styles.timestamp}>{getRelativeTime(createdAt)}</p>
				</VStack>
				{currentUser?._id === author._id ? <CrossButton cb={handleDeletePost} /> : null}
			</HStack>
			<p className={styles.description}>{description}</p>
			<PostImages images={content} />
		</>
	);
};

export default PostContent;
