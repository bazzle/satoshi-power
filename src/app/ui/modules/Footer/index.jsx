import styles from './Footer.module.scss'
import NostrCopy from '@/app/ui/components/NostrCopy'

function Footer(){
	return (
		<footer className={styles.footer}>
			<div className="row">
				<div className="row-container--wider">
					<div className={styles.footer__container}>
						<p>
							Any feedback? please DM me: <a href="https://twitter.com/bazzle">Bazzle</a><br/>
							<NostrCopy/>
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;