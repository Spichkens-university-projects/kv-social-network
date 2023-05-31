import Login from '@/pages/Login/Login';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Аутентификация'
};

export default function LoginPage() {
	return <Login />;
}
