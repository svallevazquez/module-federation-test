import type { FC } from 'react';
import Layout, { Content } from 'antd/lib/layout/layout';

import styles from './mainLayout.module.css';
import { Outlet } from 'react-router';

const MainLayout: FC = () => {
	return (
		<Layout>
			<Content className={styles.mainContent}>
				<Outlet />
			</Content>
		</Layout>
	);
};

export default MainLayout;
