'use client'
import { useEffect, useState } from 'react'
import styles from './ShareButtons.module.scss'
import CopyIcon from './CopyIcon.tsx'
import {
	TwitterShareButton,
	XIcon,
	TelegramShareButton,
	TelegramIcon,
} from 'react-share'

function ShareButtons(){
	const [shareUrl, setShareUrl] = useState('')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setShareUrl(window.location.href)
		}
	}, [])

	return (
		<div className={styles.shareButtons}>
			<div className={styles.shareButtons__label}>
				Share this
			</div>
			<div className={styles.shareButtons__list}>
				<TwitterShareButton
					url={shareUrl}
					htmlTitle="Share on X"
					title="Share on X"
					resetButtonStyle
				>
					<XIcon
						round={false}
						size={36}
						iconFillColor="white"
						bgStyle={{ fill: 'transparent' }}
					/>
				</TwitterShareButton>

				<TelegramShareButton
					url={shareUrl}
					htmlTitle="Share on Telegram"
					title="Share on Telegram"
				>
					<TelegramIcon
						round={false}
						size={36}
						iconFillColor="white"
						bgStyle={{ fill: 'transparent' }}
					/>
				</TelegramShareButton >

				<CopyIcon
					shareUrl={shareUrl}
				/>

			</div>
		</div>
	)
}

export default ShareButtons
