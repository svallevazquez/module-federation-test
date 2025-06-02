import type { FC } from 'react';
import styles from './index.module.scss';

const Home: FC = () => {
	return (
		<>
			<div className={styles.container}>
				<h1>Testing Project</h1>
				<h3>Hello Test</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipiscing elit lacus odio taciti erat, cum cubilia molestie aliquet. Habitant aptent volutpat convallis vitae imperdiet netus aliquet facilisis, laoreet facilisi rutrum magna nunc commodo sapien, non erat mollis quis phasellus nisi neque. At sociosqu lectus habitasse cras vivamus neque eget justo, magna dui auctor conubia gravida purus netus, mattis curabitur dapibus sapien sagittis primis tincidunt.
				</p>
			</div>
		</>
	);
};

export default Home;
