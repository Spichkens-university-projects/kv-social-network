import { POSTS_LIST_COUNT_LIMIT } from '@/utils/constants/lists.constants';
import { FC, useState } from 'react';

import LazyLoader from '@/components/containers/LazyLoader/LazyLoader';
import PostCard from '@/components/ui/posts/PostCard/PostCard';

import { usePostActions } from '@/hooks/actions/usePostActions';
import { usePostsState } from '@/hooks/states/usePostsState';

interface PostListProps {
	filter: string[];
}

const PostsList: FC<PostListProps> = ({ filter }) => {
	const { getPostsWithLikes } = usePostActions();
	const { posts, moreOnServer } = usePostsState();
	const [page, setPage] = useState(1);

	const getPosts = () => {
		getPostsWithLikes({ page, limit: POSTS_LIST_COUNT_LIMIT });
		setPage(prevPage => prevPage + 1);
	};

	return (
		<LazyLoader
			hasNextPage={moreOnServer}
			getData={getPosts}
			itemsSpacing={4}
			list={posts.filter(post => filter.includes(post.author._id))}
			renderItem={item => <PostCard key={item._id} post={item} />}
		/>
	);
};

PostsList.displayName = 'PostsList';

export default PostsList;
