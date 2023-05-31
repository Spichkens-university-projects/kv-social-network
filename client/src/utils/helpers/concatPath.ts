import { Pages } from '@/utils/constants/pages.constants';

export const concatPath = (page: Pages, paths: string | string[]): string => {
	if (!Array.isArray(paths)) paths = [paths];
	return page.concat('/', paths.join('/'));
};
