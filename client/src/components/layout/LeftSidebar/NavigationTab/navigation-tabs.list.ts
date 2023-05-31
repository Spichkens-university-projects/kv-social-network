import { Pages } from '@/utils/constants/pages.constants';
import { IconType } from 'react-icons';
import { BiMessageSquare, BiNews, BiUser } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { TbPhoto, TbSettings2 } from 'react-icons/tb';

export interface INavigationTab {
	link: Pages;
	label: string;
	icon: IconType;
}

export const navigationTabs: INavigationTab[] = [
	{
		label: 'Профиль',
		link: Pages.PROFILE,
		icon: BiUser
	},
	{
		label: 'Новости',
		link: Pages.NEWS,
		icon: BiNews
	},
	{
		label: 'Друзья',
		link: Pages.FRIENDS,
		icon: FiUsers
	},
	{
		label: 'Мессенджер',
		link: Pages.MESSENGER,
		icon: BiMessageSquare
	},
	{
		label: 'Фото',
		link: Pages.PHOTOS,
		icon: TbPhoto
	},
	{
		label: 'Настройки',
		link: Pages.SETTINGS,
		icon: TbSettings2
	}
];
