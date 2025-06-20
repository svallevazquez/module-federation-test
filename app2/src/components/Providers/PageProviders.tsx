import type { FC } from 'react';
import { Outlet } from 'react-router';
import { App, theme } from 'antd';

const PageProviders: FC = () => {
	const { token } = theme.useToken();
	console.log('[APP2 Remote] Token: ', token.colorPrimary);

	return (
		<App>
			<Outlet />
		</App>
	);
};

export default PageProviders;
