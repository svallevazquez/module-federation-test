import type { FC, ReactElement } from 'react';
import type { RouteObject } from 'react-router';
import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router';
import appRoutes from '@constants/routes/index';
import { ConfigProvider } from 'antd';

export const generateRouteElements = (routes: RouteObject[]): ReactElement[] => {
	return routes.map((route, index) => {
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
					{generateRouteElements(appRoutes)}
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
};

export default App;
