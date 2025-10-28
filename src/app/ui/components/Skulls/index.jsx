import icons from '@/app/ui/misc/Icons';
import styles from './Skulls.module.scss';

function Skulls({subUnitKilled, mainUnitKilled, orangeBg}){
	let classNameString
	if (orangeBg && mainUnitKilled){
		classNameString = styles.skullIcon____black;
	} else {
		classNameString = styles.skullIcon;
	}
	const skullIcon = <div className={classNameString}>{icons.skull}</div>
	return (
		<div className={styles.skulls}>
			{ ((subUnitKilled) ? skullIcon : '' )}
			{ ((mainUnitKilled) ? skullIcon : '' )}
		</div>
	)
}

export default Skulls;