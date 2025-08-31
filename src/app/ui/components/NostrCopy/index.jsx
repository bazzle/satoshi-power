"use client";
import styles from "./NostrCopy.module.scss"
import Icons from '@/app/ui/misc/Icons'
import { useEffect, useState } from "react";

function NostrCopy(){
	
	const nostrKey = 'bazzle@br-web.me'
	const [messageShow, setMessageShow] = useState(false)

	const messageContainer = ()=>{
		if (!messageShow) return 
		return (
			<span className={styles.nostrCopy__message}>Copied!</span>
		)
	}
	
	const handleClick = ()=>{
		navigator.clipboard.writeText(nostrKey)
		.then(()=> {
			setMessageShow(true)
			setTimeout(()=>{
				setMessageShow(false)
			},700)
		})
		.catch((err)=> console.error('Failed to copy to clipboard: ', err))
	}

	return (
		<span className={styles.nostrCopy}>
			<button className={styles.nostrCopy__button} onClick={handleClick} id="js-nostr-copy">
				<span className={styles.nostrCopy__key} id="js-nostr-key">bazzle@br-web.me</span>
				<span className={styles.nostrCopy__icon}>{Icons.copy}</span>
				{messageContainer()}
			</button>
		</span>
	)
}

export default NostrCopy