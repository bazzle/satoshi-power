import styles from "./ShareButtons.module.scss";
import { useState } from "react";
import Icons from '@/app/ui/misc/Icons'

function CopyIcon({shareUrl}){

	const [messageShow, setMessageShow] = useState(false)

	const messageContainer = ()=>{
		if (!messageShow) return 
		return (
			<span className={styles.shareButtons__message}>Copied!</span>
		)
	}
	
	const copyButtonHandler = (evt) => {
		navigator.clipboard.writeText(shareUrl)
		.then(()=> {
			setMessageShow(true)
			setTimeout(()=>{
				setMessageShow(false)
			},700)
		})
		.catch((err)=> console.error('Failed to copy to clipboard: ', err))
	}
	
	return(
		<>
			<button className={styles.shareButtons__copy} onClick={copyButtonHandler}>
				{Icons.copy}
				{messageContainer()}
			</button>
		</>
	)
}

export default CopyIcon