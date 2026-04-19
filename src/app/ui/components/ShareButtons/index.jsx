'use client'
import { useEffect, useState } from 'react'
import styles from './ShareButtons.module.scss'
import CopyIcon from './CopyIcon.jsx'
import {
	TwitterShareButton,
	XIcon,
	TelegramShareButton,
	TelegramIcon,
} from 'react-share'

function ShareButtons({ title, excerpt, preText }){
	const [shareUrl, setShareUrl] = useState('')
	const emailBody = shareUrl
	const mailtoHref = shareUrl ? `mailto:?subject=${encodeURIComponent(title)}&body=${emailBody}` : undefined
	const [messageShow, setMessageShow] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setShareUrl(window.location.href)
		}
	}, [])

	return (
		<div className={styles.shareButtons}>
			<div className={styles.shareButtons__label}>
				{preText ? preText : 'Share this'}
			</div>
			<div className={styles.shareButtons__list}>
				<TwitterShareButton
					url={shareUrl}
					htmlTitle="Share on X"
					title={title}
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
					title={title}
				>
					<TelegramIcon
						round={false}
						size={36}
						iconFillColor="white"
						bgStyle={{ fill: 'transparent' }}
					/>
				</TelegramShareButton >

				<CopyIcon shareUrl={shareUrl} />

			</div>
		</div>
	)
}

export default ShareButtons
