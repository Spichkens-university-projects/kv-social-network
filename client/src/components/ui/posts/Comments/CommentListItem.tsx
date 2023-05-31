import { concatName } from '@/utils/helpers/concatName';
import { absoluteTime } from '@/utils/helpers/dayjs.helper';
import { FC } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';

import { IComment } from '@/types/posts.types';

interface CommentListItemProps {
	comment: IComment;
}

const CommentListItem: FC<CommentListItemProps> = ({ comment }) => {
	return (
		<HStack className={'items-center gap-2'}>
			<CustomImage
				alt={'avatar'}
				width={120}
				height={120}
				src={comment.commentator.avatar}
				className={'rounded-md aspect-square w-10 object-cover'}
			/>
			<VStack>
				<HStack className={'gap-2'}>
					<p className={'font-semibold'}>{concatName(comment.commentator)}</p>
					<p className={'text-text-inactive'}>{absoluteTime(comment.createdAt)}</p>
				</HStack>
				<p>{comment.commentText}</p>
			</VStack>
		</HStack>
	);
};

export default CommentListItem;
