import { ChangeEvent, FC, useState } from 'react';
import { BiSend } from 'react-icons/bi';

import HStack from '@/components/containers/Stack/HStack/HStack';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';
import Icon from '@/components/ui/primitives/Icon/Icon';
import Input from '@/components/ui/primitives/Input/Input';
import Button from '@/components/ui/primitives/buttons/SubmitButton/Button';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import { useAuthState } from '@/hooks/states/useAuthState';

import { CommentService } from '@/services/comment.service';

import { addComment } from '@/store/posts/post.slice';

interface CreateCommentBlockProps {
	postId: string;
}

const CreateCommentBlock: FC<CreateCommentBlockProps> = ({ postId }) => {
	const dispatch = useTypedDispatch();
	const { currentUser } = useAuthState();
	const [comment, setComment] = useState('');

	const handleCreateComment = () => {
		if (comment !== '') {
			CommentService.createComment({ commentText: comment, postId }).then(res =>
				dispatch(addComment(res))
			);
			setComment('');
		}
	};

	const handleChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
		setComment(event.target.value);
	};

	return (
		<HStack className={'gap-2'}>
			<CustomImage
				alt={'avatar'}
				src={currentUser?.avatar}
				width={120}
				height={120}
				className={'rounded-md aspect-square object-cover w-10'}
			/>
			<Input type={'text'} placeholder={'Написать комментарий'} onChange={handleChangeComment} />
			<Button variant={'ghost'} onClick={handleCreateComment}>
				<Icon icon={BiSend} size={24} />
			</Button>
		</HStack>
	);
};

export default CreateCommentBlock;
