'use client';
import styles from './currencyItem.module.scss';
import Link from 'next/link';
import Skulls from '@/app/ui/components/Skulls';

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

	const status = () => {
		return (
			<div className={styles.currencyItem__statusContainer}>
				{itemObj.mainUnitKilled ? <Skulls howMany={itemObj.score} orangeBg /> : <Skulls howMany={itemObj.score} />}
			</div>
		)
	}

	const currencyPagePath = `/currency/${itemObj.currencyCodeSlug}`
	
	return (
		<li className={classes}>
			<Link className={styles.currencyItem__link} href={currencyPagePath}></Link>
			{DomPercentageBar()}
			<div className={styles.currencyItem__inner}>
				{status()}
				{DomTextString()}
			</div>
		</li>
	)
}

export default CurrencyItem