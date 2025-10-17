import styles from './LogoLockup.module.scss';
import Icons from '@/app/ui/misc/Icons';

function LogoLockup(){
	const {sat} = Icons
	return (
		<div className={styles.logoLockup}>
			<div className={styles.logoLockup__logo}>
				{sat}
			</div>
			<div className={styles.logoLockup__text}>
				<h1 className={styles.logoLockup__sitename}>Satoshi Power</h1>
				<span className={styles.logoLockup__subtitle}>Sats will eat the world</span>
			</div>
		</div>
	)
}

export default LogoLockup;