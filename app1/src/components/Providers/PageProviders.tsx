import type { FC } from 'react';
import { Outlet } from 'react-router';
import { App } from 'antd';

const PageProviders: FC = () => {
	return (
		<App>
			<Outlet />
		</App>
	);
};

export default PageProviders;
