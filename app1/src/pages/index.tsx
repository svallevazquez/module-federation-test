import { Content } from 'antd/lib/layout/layout';
import { Link } from 'react-router';
import type { FC } from 'react';

const GroupsMainPage: FC = () => {
	return (
		<Content>
			<h1>Welcome to the home page</h1>
			<h3>You can choose to navigate to these index pages:</h3>
			<ul>
				<li>
					<Link to='/sales'>Sales</Link>
				</li>
			</ul>
		</Content>
	);
};

export default GroupsMainPage;
