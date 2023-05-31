import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC } from 'react';
import { RxCross2 } from 'react-icons/rx';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';
import Icon from '@/components/ui/primitives/Icon/Icon';

interface ImagesToPostProps {
	imageUrls: string[];
	onRemove: (url: string) => void;
}

const ImagesToPost: FC<ImagesToPostProps> = ({ imageUrls, onRemove }) => {
	const [ref] = useAutoAnimate();

	const handleRemoveImage = (url: string) => {
		onRemove(url);
	};

	return (
		<HStack ref={ref} className={'gap-2'}>
			{imageUrls?.map(url => (
				<VStack className={'relative'} key={url}>
					<Icon
						onClick={() => handleRemoveImage(url)}
						icon={RxCross2}
						className={'cursor-pointer bg-black bg-opacity-70 rounded-xxs absolute right-1 top-1'}
						color={'white'}
					/>
					<CustomImage
						alt={'image-to-post'}
						src={url}
						width={500}
						height={500}
						className={'rounded-md aspect-square  object-cover w-32 h-auto'}
					/>
				</VStack>
			))}
		</HStack>
	);
};

export default ImagesToPost;
