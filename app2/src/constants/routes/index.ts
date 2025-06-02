import PageProviders from '@components/Providers/PageProviders';
import type { RouteObject } from 'react-router';
import GroupsMainPage from '@pages/index';
import MainLayout from '@components/layouts/mainLayout';
import VendorsMainPage from '@pages/vendors';

const APP_ROUTES: RouteObject[] = [
	{
		Component: PageProviders,
		children: [
			{
				index: true,
				Component: GroupsMainPage,
			},
			{
				path: 'vendors',
				children: [
					{
						Component: MainLayout,
						children: [
							{
								index: true,
								Component: VendorsMainPage,
							},
						],
					},
				],
			},
		],
	},
];

export default APP_ROUTES;
