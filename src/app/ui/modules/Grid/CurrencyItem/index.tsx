'use client'
import styles from './currencyItem.module.scss'
import Link from 'next/link'
import Skulls from '@/app/ui/components/Skulls'

function CurrencyItem( { itemObj }: Record<string, any> ){

	const classesArray = [
		styles.currencyItem,
		itemObj.smallUnitKilled ? styles['currencyItem--subUnitKilled'] : '',
		itemObj.mainUnitKilled ? styles['currencyItem--mainUnitKilled'] : '',
	]
	const classes = classesArray.join(' ')

	const DomTextString = () => {
		const name = itemObj.displayName
		const itemTextString = itemObj.percentage < 1 ? `${name} <1%` : `${name} ${itemObj.percentage}%`
		return (
			<span className={styles.currencyItem__text}>
				{itemTextString}
			</span>
		)
	}

	const status = () => {
		return (
			<div className={styles.currencyItem__statusContainer}>
				{itemObj.mainUnitKilled ? <Skulls howMany={itemObj.score} orangeBg /> : <Skulls howMany={itemObj.score} orangeBg />}
			</div>
		)
	}
	const itemName = itemObj.displayName
	const itemTextString = itemObj.percentage < 1 ? `${itemName} <1%` : `${itemName} ${itemObj.percentage}%`

	const itemAttributes = {
		percentageBar: () => {
			const width = itemObj.percentage > 100 ? 100 : itemObj.percentage
			return (
				<span style={{ width: `${width}%` }} className={styles.currencyItem__percentageBar}></span>
			)
		},
		textElem: () => {
			return (
				<span className={styles.currencyItem__text}>
					{itemTextString}
				</span>
			)
		},
		status: () => {
			return (
				<div className={styles.currencyItem__statusContainer}>
					{itemObj.mainUnitKilled ? <Skulls howMany={itemObj.score} orangeBg /> : <Skulls howMany={itemObj.score} />}
				</div>
			)
		},
	}

	const currencyPagePath = `/currency/${itemObj.currencyCodeSlug}`

	return (
		<li className={classes}>
			<Link className={styles.currencyItem__link} href={currencyPagePath} aria-label={itemTextString}></Link>
			{itemAttributes.percentageBar()}
			<div className={styles.currencyItem__inner}>
				{itemAttributes.status()}
				{itemAttributes.textElem()}
			</div>
		</li>
	)
}

export default CurrencyItem
