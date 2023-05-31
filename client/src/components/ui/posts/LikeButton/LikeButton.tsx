import styles from './LikeButton.module.scss';
import { cn } from '@/utils/helpers/cn.helper';
import { FC, memo } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import HStack from '@/components/containers/Stack/HStack/HStack';
import Icon from '@/components/ui/primitives/Icon/Icon';

import { usePostActions } from '@/hooks/actions/usePostActions';

import { IPost } from '@/types/posts.types';

interface LikeButtonProps {
	post: IPost;
}

const LikeButton: FC<LikeButtonProps> = memo(({ post: { _id, likes, isLiked } }) => {
	const { togglePostLike } = usePostActions();

	const handleLikePost = async () => {
		togglePostLike({ isLiked, postId: _id });
	};

	return (
		<HStack className={cn(styles.container, { [styles.liked]: isLiked })} onClick={handleLikePost}>
			<Icon
				icon={isLiked ? AiFillHeart : AiOutlineHeart}
				color={isLiked ? '#E60023' : '#656565'}
				className={styles.counter}
			/>
			<span className={styles.counter}>{likes.length}</span>
		</HStack>
	);
});

LikeButton.displayName = 'LikeButton';

export default LikeButton;
