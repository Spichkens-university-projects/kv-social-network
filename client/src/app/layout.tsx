'use client';

import '@/assets/styles/globals.scss';
import RootProviders from '@/providers/RootProviders';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ru'>
			<body className={montserrat.className}>
				<RootProviders>{children} </RootProviders>
			</body>
		</html>
	);
}
