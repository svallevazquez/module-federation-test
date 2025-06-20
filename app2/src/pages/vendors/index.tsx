import type { FC } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Button } from 'antd';

const VendorsMainPage: FC = () => {
	return (
		<Content>
			Vendors content

			<Button type='primary'>
				Test button
			</Button>
		</Content>
	);
};

export default VendorsMainPage;
