import Settings from '@/pages/Settings/Settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Настройки'
};

const SettingsPage = ({}) => {
	return <Settings />;
};

export default SettingsPage;
