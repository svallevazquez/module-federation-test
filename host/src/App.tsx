import '@/styles/normalize.css';
import type {
	FC,
	ReactElement,
	ReactNode,
} from 'react';
import type { RouteObject } from 'react-router';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
} from 'react-router';
import app1AppRoutes from 'app1/routes';
import app2AppRoutes from 'app2/routes';
import MainLayout from './components/layouts/main-layout';
import DashboardPage from '@/pages';
import { isApp1Active, isApp2Active } from './utils/is-remote-active';
import ServiceDownError from './components/errors/service-down-error';
import PageNotFoundError from './components/errors/page-not-found-error';
import { ConfigProvider } from 'antd';

export const generateRouteElements = (routes: RouteObject[]): ReactElement[] => {
	return routes?.map((route, index) => {
		const {
			children,
			id,
			index: isIndex,
			Component,
			path,
		} = route;

		if (isIndex) {
			return (
				<Route
					key={id || index}
					id={id}
					index
					Component={Component}
				>
					{children && generateRouteElements(children)}
				</Route>
			);
		}

		return (
			<Route
				key={id || index}
				id={id}
				Component={Component}
				path={path}
			>
				{children && generateRouteElements(children)}
			</Route>
		);
	});
};

const App: FC = () => {
	return (
		<ConfigProvider theme={{
			token: {
				colorPrimary: '#fff000',
			}
		}}>
			<BrowserRouter>
				<Routes>
					<Route Component={MainLayout}>
						<Route index Component={DashboardPage} />
						<Route path="app1_profile">
							<Route index element={<Navigate to="sales" replace />} />
							{((): ReactNode => {
								if (isApp1Active()) {
									console.log('Into App1 - Sales route');
									return generateRouteElements(app1AppRoutes);
								}

								return (
									<Route path="*" Component={ServiceDownError} />
								);
							})()}
						</Route>
						<Route path="app2_profile">
							<Route index element={<Navigate to="vendors" replace />} />
							{((): ReactNode => {
								if (isApp2Active()) {
									console.log('Into App2 - Vendors route');
									return generateRouteElements(app2AppRoutes);
								}

								return (
									<Route path="*" Component={ServiceDownError} />
								);
							})()}
						</Route>
						<Route path="*" Component={PageNotFoundError} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
};

export default App;
