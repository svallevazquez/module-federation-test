import { Button } from 'antd';
import type { FC } from 'react';
import { Link } from 'react-router';

const BackToDashBoardButton: FC = () => {
	return (
		<Link to="/">
			<Button type="primary">Back to Dashboard</Button>
		</Link>
	);
};

export default BackToDashBoardButton;
