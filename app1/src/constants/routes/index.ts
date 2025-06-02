import PageProviders from '@components/Providers/PageProviders';
import type { RouteObject } from 'react-router';
import GroupsMainPage from '@pages/index';
import MainLayout from '@components/layouts/mainLayout';
import SalesMainPage from '@pages/sales';

const APP_ROUTES: RouteObject[] = [
	{
		Component: PageProviders,
		children: [
			{
				index: true,
				Component: GroupsMainPage,
			},
			{
				path: 'sales',
				children: [
					{
						Component: MainLayout,
						children: [
							{
								index: true,
								Component: SalesMainPage,
							},
						],
					},
				],
			},
		],
	},
];

export default APP_ROUTES;
