import styles from './About.module.scss'
import Icons from '@/app/ui/misc/Icons'

function About(){

	return (
		<div className="row">
			<div className={styles.about}>
				<div className={styles.about__inner}>
					<p className={styles.about__intro}>
						Comparing the price of a satoshi against fiat shitcoins
					</p>
					<p className={styles.about__key}>
						<span className={styles.about__key__group}>
							<span className={styles.about__key__skulls}>
								{Icons.skull}
							</span>
							<span>= Sub-unit already dead</span>
						</span>
						<span className={styles.about__divider}>/</span>
						<span className={styles.about__key__group}>
							<span className={styles.about__key__skulls}>
								{Icons.skull}
								{Icons.skull}
							</span>
							<span>= Sub-unit and main unit dead</span>
						</span>
					</p>
					<hr/>
				</div>
			</div>
		</div>
	)
}

export default About;