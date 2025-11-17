'use client'
import icons from '@/app/ui/misc/Icons';
import styles from './Skulls.module.scss';

function Skulls({howMany, orangeBg}){

	let classNameString
	if (orangeBg){
		classNameString = styles.skullIcon____black;
	} else {
		classNameString = styles.skullIcon;
	}

	const skullIcon = <span className={classNameString}>{icons.skull}</span>

	const skullsOutput = () => {
		if (howMany === 1){
			return (
				<>{skullIcon}</>
			)
		} else if (howMany === 2){
			return (
				<>{skullIcon}{skullIcon}</>
			)
		}
	}

	return (
		<span className={styles.skulls}>
			{skullsOutput()}
		</span>
	)
}

export default Skulls;