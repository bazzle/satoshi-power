import styles from './Header.module.scss'
import LogoLockup from '@/app/ui/components/LogoLockup';
import Link from 'next/link';

function Header(){
	return (
        <header className={styles.header}>
            <div className="row">
                <div className="row-container">
					<div className={styles.header__container}>
						<Link href="/">
							<LogoLockup />
						</Link>
					</div>
                </div>
            </div>
        </header>
	)
}

export default Header;