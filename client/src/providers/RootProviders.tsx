import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Loader from '@/components/ui/primitives/Loader/Loader';

import { persistor, store } from '@/store/store';

interface ProvidersProps {
	children: ReactNode;
}

const RootProviders: FC<ProvidersProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={<Loader />} persistor={persistor}>
				<ThemeProvider
					enableColorScheme={true}
					disableTransitionOnChange={false}
					attribute={'class'}
					enableSystem={true}
					defaultTheme={'system'}
				>
					<Toaster position='bottom-left' reverseOrder={false} />
					{children}
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
};

export default RootProviders;
