'use client'
import { useEffect, useState } from "react";
import styles from "./ShareButtons.module.scss";
import {
	TwitterShareButton,
	XIcon,
	LinkedinShareButton,
	LinkedinIcon,
	TelegramShareButton,
	TelegramIcon,
	EmailShareButton,
	EmailIcon
} from "react-share";

function ShareButtons({title, excerpt, preText}){
	const [shareUrl, setShareUrl] = useState("");
	const emailBody = shareUrl
	const mailtoHref = shareUrl ? `mailto:?subject=${encodeURIComponent(title)}&body=${emailBody}` : undefined;

	useEffect(() => {
		if (typeof window !== "undefined") {
			setShareUrl(window.location.href);
		}
	}, []);
	return(
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
						bgStyle={{fill: 'transparent'}}
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
						bgStyle={{fill: 'transparent'}}
					/>
				</TelegramShareButton>

			</div>
		</div>
	)
}

export default ShareButtons;