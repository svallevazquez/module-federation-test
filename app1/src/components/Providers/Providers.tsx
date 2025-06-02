import type { FC } from 'react';
import { Provider as JotaiProvider } from 'jotai';

type Props = {
	children: React.ReactNode
}

const Providers: FC<Props> = ({ children }) => {
	return (
		<JotaiProvider>
			{children}
		</JotaiProvider>
	);
};

export default Providers;
