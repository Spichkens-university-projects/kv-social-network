import styles from './PostImages.module.scss';
import { FC } from 'react';

import Grid from '@/components/containers/Grid/Grid';
import CustomImage from '@/components/ui/primitives/CustomImage/CustomImage';

interface PostImagesProps {
	images: string[];
}

const PostImages: FC<PostImagesProps> = ({ images }) => {
	return (
		<Grid cols={images.length !== 1 ? 2 : 1}>
			{images?.map(imageUrl => (
				<CustomImage
					key={imageUrl}
					src={imageUrl}
					width={1000}
					height={1000}
					className={styles.image}
					alt={'content'}
				/>
			))}
		</Grid>
	);
};

export default PostImages;
