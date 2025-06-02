import { PAGE_NOT_FOUND_ERROR } from '@/constants/error-messages/page-errors';
import { Result } from 'antd';
import type { FC } from 'react';
import BackToDashBoardButton from '../back-to-darhboard-button';

const PageNotFoundError: FC = () => {
	return (
		<Result
			status="404"
			title={PAGE_NOT_FOUND_ERROR}
			extra={<BackToDashBoardButton />}
		/>
	);
};

export default PageNotFoundError;
