import styles from './Header.module.scss'
import LogoLockup from '@/app/ui/components/LogoLockup';

function Header(){
	return (
        <header className={styles.header}>
            <div className="row">
                <div className="row-container--wider">
					<div className={styles.header__container}>
						<LogoLockup />
					</div>
                </div>
            </div>
        </header>
	)
}

export default Header;