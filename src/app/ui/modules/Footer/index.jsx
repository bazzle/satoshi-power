import styles from './Footer.module.scss'
import NostrCopy from '@/app/ui/components/NostrCopy'

function Footer(){
	return (
		<footer className={styles.footer}>
			<div className="row row--nomargin-top">
				<div className="row-container row-container--wider">
					<div className={styles.footer__container}>
						<p>
							Any feedback? please <a href="https://x.com/bazzle" title="X account">DM me on X – @bazzle</a>
						</p>
						<p>Or find me on nostr: <NostrCopy/></p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;