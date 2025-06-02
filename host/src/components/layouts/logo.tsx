import { Flex } from 'antd';
import type { FC } from 'react';
import styles from './main-layout.module.scss';
import { Link } from 'react-router';

type Props = {
	collapsed: boolean
}

const Logo: FC<Props> = (props) => {
	const {
		collapsed,
	} = props;

	return (
		<Flex className={styles.logo} justify="center" align="center">
			<Link to="/" className={styles['logo-link']}>
				·
			</Link>
		</Flex>
	);
};

export default Logo;
