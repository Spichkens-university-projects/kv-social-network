import { FC, useState } from 'react';

import VStack from '@/components/containers/Stack/VStack/VStack';
import CommentListItem from '@/components/ui/posts/Comments/CommentListItem';

import { IComment } from '@/types/posts.types';

interface CommentListProps {
	comments: IComment[];
}

const CommentList: FC<CommentListProps> = ({ comments }) => {
	const [listLength, setListLength] = useState<{ length: number; isFull: boolean }>({
		isFull: false,
		length: 1
	});

	const toggleCommentList = () => {
		if (listLength.isFull) setListLength({ isFull: false, length: 1 });
		setListLength({ isFull: true, length: comments.length });
	};

	return (
		<VStack>
			{listLength.length > 1 && (
				<p
					onClick={toggleCommentList}
					className={
						'hover:underline cursor-pointer text-accents-blue-light gdark:text-accents-blue-dark'
					}
				>
					{listLength.isFull ? 'Скрыть список' : 'Показать все комментарии'}
				</p>
			)}

			<VStack className={'gap-2'}>
				{comments
					? comments.map(comment => <CommentListItem key={comment._id} comment={comment} />)
					: null}
			</VStack>
		</VStack>
	);
};

export default CommentList;
