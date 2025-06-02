import { SERVICE_DOWN_ERROR } from '@/constants/error-messages/page-errors';
import { Tooltip } from 'antd';
import type { FC, PropsWithChildren } from 'react';
import styles from './side-menu-item-label.module.scss';
import { Link } from 'react-router';

type Props = PropsWithChildren<{
	disabled?: boolean
	path: string
}>

const SideMenuItemLabel: FC<Props> = (props) => {
	const {
		children,
		disabled,
		path,
	} = props;

	if (disabled) {
		return (
			<Tooltip title={SERVICE_DOWN_ERROR}>
				<span
					data-testid='side-menu-item-label-disabled'
					className={styles.disabled}
				>
					{children}
				</span>
			</Tooltip>
		);
	}

	return (
		<Link to={path} rel="noreferrer noopener">{children}</Link>
	);
};

export default SideMenuItemLabel;
