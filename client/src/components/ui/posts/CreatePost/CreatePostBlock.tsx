import styles from './CreatePostBlock.module.scss';
import { uploadHelper } from '@/utils/helpers/upload-file.helper';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import ImagesToPost from '@/components/ui/posts/CreatePost/ImagesToPost/ImagesToPost';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';
import HorizontalLine from '@/components/ui/primitives/HorizontalLine/HorizontalLine';
import AttachmentButton from '@/components/ui/primitives/buttons/AttachmentButton/AttachmentButton';
import CrossButton from '@/components/ui/primitives/buttons/CrossButton/CrossButton';
import Button from '@/components/ui/primitives/buttons/SubmitButton/Button';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import { useAuthState } from '@/hooks/states/useAuthState';

import { PostService } from '@/services/post.service';

import { addPost } from '@/store/posts/post.slice';

import { IFile } from '@/types/files.types';
import { CreatePostDto } from '@/types/posts.types';

const CreatePostBlock = ({}) => {
	const { currentUser } = useAuthState();
	const dispatch = useTypedDispatch();
	const { register, reset, handleSubmit } = useForm<CreatePostDto>();
	const [animateRef] = useAutoAnimate();
	const [isFull, setIsFull] = useState(false);
	const [imageToPostUrls, setImageToPostUrls] = useState<string[]>([]);

	const onFocus = () => setIsFull(true);

	const onReset = () => {
		setIsFull(false);
		reset();
	};

	const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		await uploadHelper(event, `/create-post`, updateUserAfterChangingPostImage);
	};

	const updateUserAfterChangingPostImage = (file: IFile) => {
		setImageToPostUrls(prev => [...prev, file.url]);
	};

	const deleteImageFromImageToPostUrls = (urlToDelete: string) => {
		const filteredList = imageToPostUrls.filter(url => url !== urlToDelete);
		setImageToPostUrls(filteredList);
	};

	const handleCreatePost = async (data: CreatePostDto) => {
		const newPost = await PostService.createPost({
			description: data.description,
			content: imageToPostUrls
		});
		dispatch(addPost(newPost));
		onReset();
		setImageToPostUrls([]);
	};

	return (
		<form onSubmit={handleSubmit(handleCreatePost)}>
			<VStack ref={animateRef} className={styles.container}>
				<HStack className={styles.topFloor}>
					<CustomImage
						alt={'user-avatar'}
						width={120}
						height={120}
						className={styles.avatar}
						src={currentUser?.avatar}
					/>
					<input
						type='text'
						placeholder={'Что у вас нового?'}
						{...register('description')}
						className={styles.input}
						onFocus={onFocus}
					/>
					{/* Если блок раскрыт, то показываем кнопку очистки инпута, иначе - кнопку выбора файла */}
					{isFull ? <CrossButton cb={onReset} /> : <AttachmentButton onChange={onChangeFile} />}
				</HStack>
				{isFull ? (
					<>
						<ImagesToPost
							imageUrls={imageToPostUrls}
							onRemove={(url: string) => deleteImageFromImageToPostUrls(url)}
						/>
						<HorizontalLine />
						<HStack className={styles.botFloor}>
							<AttachmentButton onChange={onChangeFile} />
							<Button type={'submit'}>Отправить</Button>
						</HStack>
					</>
				) : null}
			</VStack>
		</form>
	);
};

export default CreatePostBlock;
