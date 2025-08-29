import styles from './LogoLockup.module.scss';

function LogoLockup(){
	return (
		<div className={styles.logoLockup}>
			<div className={styles.logoLockup__logo}>
				<svg className={styles.logoLockup__symbol} width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="12.3334" y="39.1763" width="5.80392" height="8.70588" fill="white"/>
					<rect x="12.3334" width="5.80392" height="8.70588" fill="white"/>
					<rect y="11.6074" width="31.1961" height="6.52941" fill="white"/>
					<rect y="20.3135" width="31.1961" height="6.52941" fill="white"/>
					<rect y="29.0195" width="31.1961" height="6.52941" fill="white"/>
				</svg>
			</div>
			<div className={styles.logoLockup__text}>
				<h1 className={styles.logoLockup__sitename}>Satoshi Power</h1>
				<span className={styles.logoLockup__subtitle}>Sats will eat the world</span>
			</div>
		</div>
	)
}

export default LogoLockup;