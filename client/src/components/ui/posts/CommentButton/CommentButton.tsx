import styles from './CommentButton.module.scss';
import { FC } from 'react';
import { BiCommentDetail } from 'react-icons/bi';

import HStack from '@/components/containers/Stack/HStack/HStack';
import Icon from '@/components/ui/primitives/Icon/Icon';

import { IComment } from '@/types/posts.types';

interface CommentButtonProps {
	comments: IComment[];
	setCommentsShown: () => void;
}

const CommentButton: FC<CommentButtonProps> = ({ comments, setCommentsShown }) => {
	return (
		<HStack className={styles.container} onClick={setCommentsShown}>
			<Icon icon={BiCommentDetail} color={'#656565'} className={styles.counter} />
			<span className={styles.counter}>{comments.length}</span>
		</HStack>
	);
};

export default CommentButton;
