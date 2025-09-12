import styles from './CurrencyItem.module.scss';

function CurrencyItem({itemObj}: any){

	const classesArray = [
		styles.CurrencyItem,
		itemObj.smallUnitKilled ? styles["CurrencyItem--smallUnitKilled"] : '',
		itemObj.mainUnitKilled ? styles["CurrencyItem--mainUnitKilled"] : '',
	]
	const classes = classesArray.join(' ');

	const DomPercentageBar = () => {
		const width = itemObj.percentage > 100 ? 100 : itemObj.percentage;
		return (
			<span style={{width: `${width}%`}} className={styles.CurrencyItem__percentageBar}></span>
		)
	};

	const DomTextString = () => {
		const name = itemObj.displayName;
		const itemTextString = itemObj.percentage < 1 ? `${name} <1%` : `${name} ${itemObj.percentage}%`;
		return (
			<span className={styles.CurrencyItem__text}>
				{itemTextString}
			</span>
		)
	}

	
	return (
		<li className={classes}>
			{DomPercentageBar()}
			{DomTextString()}
		</li>
	)
}

export default CurrencyItem