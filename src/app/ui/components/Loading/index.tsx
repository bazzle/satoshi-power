import styles from "./Loading.module.scss"
import Icons from '@/app/ui/misc/Icons';

function Loading(){
	const {sat} = Icons
	return(
		<div className={styles.loading}>
			<div className={styles.loading__icon}>
				{sat}
			</div>
		</div>
	)
}

export default Loading;