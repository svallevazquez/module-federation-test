import {
	useCallback,
	useEffect,
	useState,
} from 'react';
import type { FC, PropsWithChildren } from 'react';
import useMainLayout from './use-main-layout';
import {
	Divider,
	Flex,
	Layout,
	Menu,
} from 'antd';
import Logo from './logo';
import styles from './main-layout.module.scss';
import { Outlet, useLocation } from 'react-router';

const MainLayout: FC<PropsWithChildren> = () => {
	const { Sider, Content, Header } = Layout;
	const {
		items,
		isCollapsed,
		selectedKeys,
		handleCollapse,
		bottomItems,
	} = useMainLayout();

	return (
		<Layout hasSider className={styles.container}>
			<Sider trigger={null} collapsible collapsed={isCollapsed} className={styles.sider}>
				<Flex className={styles['menu-sections-container']} justify="space-between" vertical>
					<section>
						<Logo collapsed={isCollapsed} />
						<Menu
							className={styles.menu}
							items={items}
							selectedKeys={selectedKeys}
						/>
					</section>
					<section className={styles['bottom-section']}>
						{isCollapsed ? <></> : <Divider className={styles.divider} />}
						<Flex vertical justify="space-between">
							<Menu
								className={styles.menu}
								items={bottomItems}
							/>
						</Flex>
					</section>
				</Flex>
			</Sider>
			<Content>
				<Header className={styles.header}>
					Header
				</Header>
				<Content>
					<Outlet />
				</Content>
			</Content>
		</Layout>
	);
};

export default MainLayout;
