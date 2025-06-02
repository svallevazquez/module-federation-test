import type { GetProps, Menu } from 'antd';
import {
	useEffect,
	useMemo,
	useState,
} from 'react';
import { microfrontendManifests, microfrontendDefaultManifests } from '@/manifests';
import type { ArrayItem } from '@/types';
import styles from './main-layout.module.scss';
import SideMenuItemLabel from '../side-menu-item-label';
import { Link, useLocation } from 'react-router';

type MenuProps = GetProps<typeof Menu>

type UseMainLayoutResult = {
	items: MenuProps['items']
	bottomItems: MenuProps['items']
	selectedKeys: MenuProps['selectedKeys']
	isCollapsed: boolean
	handleCollapse: () => void
}

const useMainLayout = (): UseMainLayoutResult => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
	const location = useLocation();

	const COLLAPSED_STORAGE_KEY = 'menu-collapsed';

	useEffect(() => {
		const initialCollapsedState = Boolean(Number(sessionStorage.getItem(COLLAPSED_STORAGE_KEY)));

		setIsCollapsed(initialCollapsedState);
	}, []);

	const MENU_GROUPS: NonNullable<MenuProps['items']> = [
		{
			type: 'group',
			label: 'Configuration',
			key: 'configuration',
			className: styles['menu-group'],
		},
		{
			type: 'group',
			label: 'Other Applications',
			key: 'other-apps',
			className: styles['menu-group'],
		},
	];

	console.log('microfrontendManifests: ', microfrontendManifests);
	console.log('microfrontendDefaultManifests: ', microfrontendDefaultManifests);
	const manifestsToUse = microfrontendManifests.map((manifest, i) =>
		manifest === undefined ? microfrontendDefaultManifests[i] : manifest);

	const groupedManifests = Object.groupBy(manifestsToUse, ({ groupName }) => groupName);

	const serviceGroupsMenuItems = Object.keys(groupedManifests).map((groupKey) => {
		return {
			...MENU_GROUPS.find((group) => group!.key === groupKey),
			children: groupedManifests[groupKey]!.map((manifest): NonNullable<ArrayItem<NonNullable<MenuProps['items']>>> => ({
				label: (
					<SideMenuItemLabel path={manifest.hostAppPath} disabled={!manifest.enabled}>
						{manifest.appDisplayName}
					</SideMenuItemLabel>
				),
				key: manifest.appName,
				className: styles['menu-item'],
				disabled: !manifest.enabled,
			})),
		};
	}) as NonNullable<MenuProps['items']>;

	const handleCollapse = (): void => setIsCollapsed((prev) => {
		sessionStorage.setItem('menu-collapsed', Number(!prev).toLocaleString());

		return !prev;
	});

	const items: MenuProps['items'] = [
		{
			label: <Link to="/" rel="noreferrer noopener">Dashboard</Link>,
			key: 'dashboard',
			className: styles['menu-item'],
		},
		...serviceGroupsMenuItems,
	];

	const bottomItems: MenuProps['items'] = [
		{
			label: 'Sign Out',
			key: 'sign-out',
			className: styles['menu-item'],
		},
	];

	const selectedKeys = useMemo(() => {
		if (location.pathname === '/') {
			return ['dashboard'];
		}

		const matchedManifest = microfrontendManifests.find((manifest) =>
			location.pathname.startsWith(manifest?.hostAppPath)
		);

		if (matchedManifest) {
			return [matchedManifest.appName];
		}

		return [];
	}, [location.pathname]);

	return {
		items,
		selectedKeys,
		isCollapsed,
		handleCollapse,
		bottomItems,
	};
};

export default useMainLayout;
