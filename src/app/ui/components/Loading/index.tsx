import styles from "./Loading.module.scss"
import Icons from '@/app/ui/misc/Icons';

function Loading(){
	const {sat} = Icons
	return(
		<div className={styles.loading}>
			{sat}
		</div>
	)
}

export default Loading;