"use client"
import styles from "./Stats.module.scss";
import Skulls from "@/app/ui/components/Skulls";

function Stats({ currencyObj }) {

	const btcPrice = new Intl.NumberFormat(currencyObj.currencyLocale).format(currencyObj.btcPrice);

	const satoshiLabelString = (num) => {
		const label = num === '1' ? 'Satoshi' : "Satoshi's"
		return `${num} ${label}`
	}

	const conversionOutput = () => {
		let output
		let conversionSubUnitSpan;
		let conversionMainUnitSpan;
		const satsPerUnit = currencyObj.satsPerUnit.toFixed(0);
		const unitsPerSat = currencyObj.unitsPerSat.toFixed(2);
		
		// Sub unit
		if (currencyObj.noSubUnit) {
			conversionSubUnitSpan = null;
		} else {
			const subUnitsPerSat = currencyObj.subUnitsPerSat.toFixed(0);
			const satsPerSubUnit = currencyObj.satsPerSubUnit.toFixed(0);
			if (currencyObj.noSubUnit) {
				conversionSubUnitSpan = null;
			} else if (currencyObj.subUnitKilled){
				conversionSubUnitSpan = <span>{subUnitsPerSat} {currencyObj.subUnitNameSingular} per sat</span>;
			} else {
				conversionSubUnitSpan = <span>{satoshiLabelString(satsPerSubUnit)} per {currencyObj.subUnitNameSingular}</span>;
			}
		}

		// Main unit
		if (currencyObj.mainUnitKilled) {
			conversionMainUnitSpan = <span>{unitsPerSat} {currencyObj.unitNameSingular} per sat</span>;
		} else {
			conversionMainUnitSpan = <span>{satoshiLabelString(satsPerUnit)} per {currencyObj.unitNameSingular}</span>;
		}
		
		output = (
			<>
				{conversionMainUnitSpan}
				{conversionSubUnitSpan && conversionSubUnitSpan}
			</>
		)
		return output;
	};

	return (
		<p className={styles.stats}>
			<span>
				1 BTC = {currencyObj.symbol}{btcPrice}
			</span>
			{conversionOutput()}
		</p>
	);
}

export default Stats;
