'use client';

import styles from './currencyItem.module.scss';
import icons from '@/app/ui/misc/Icons';
import Link from 'next/link';

function CurrencyItem({itemObj}){

	const classesArray = [
		styles.currencyItem,
		itemObj.smallUnitKilled ? styles["currencyItem--subUnitKilled"] : '',
		itemObj.mainUnitKilled ? styles["currencyItem--mainUnitKilled"] : '',
	]
	const classes = classesArray.join(' ');

	const DomPercentageBar = () => {
		const width = itemObj.percentage > 100 ? 100 : itemObj.percentage;
		return (
			<span style={{width: `${width}%`}} className={styles.currencyItem__percentageBar}></span>
		)
	};

	const DomTextString = () => {
		const name = itemObj.displayName;
		const itemTextString = itemObj.percentage < 1 ? `${name} <1%` : `${name} ${itemObj.percentage}%`;
		return (
			<span className={styles.currencyItem__text}>
				{itemTextString}
			</span>
		)
	}

	const DomIcons = () => {
		const Icon = <div className={styles.currencyItem__icon}>{icons.skull}</div>
		return (
			<div className={styles.currencyItem__statusContainer}>
				{ ((itemObj.subUnitKilled) ? Icon : '' )}
				{ ((itemObj.mainUnitKilled) ? Icon : '' )}
			</div>
		)
	}

	const currencyPagePath = `/currency/${itemObj.unitNameSlug}`
	
	return (
		<li className={classes}>
			<Link href={currencyPagePath}>
				{DomPercentageBar()}
				{DomTextString()}
				{DomIcons()}
			</Link>
		</li>
	)
}

export default CurrencyItem