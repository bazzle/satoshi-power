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

	const skullIcon = <div className={classNameString}>{icons.skull}</div>

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
		<div className={styles.skulls}>
			{skullsOutput()}
		</div>
	)
}

export default Skulls;