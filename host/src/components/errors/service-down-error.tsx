import { SERVICE_DOWN_ERROR } from '@/constants/error-messages/page-errors';
import { Result } from 'antd';
import type { FC } from 'react';
import BackToDashBoardButton from '../back-to-darhboard-button';

const ServiceDownError: FC = () => {
	return (
		<Result
			status="error"
			title={SERVICE_DOWN_ERROR}
			extra={<BackToDashBoardButton />}
		/>
	);
};

export default ServiceDownError;
