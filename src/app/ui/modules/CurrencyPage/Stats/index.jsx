"use client"
import styles from "./Stats.module.scss";
import Skulls from "@/app/ui/components/Skulls";

function Stats({ currencyObj }) {
	let conversionSubUnitSpan;
	let conversionMainUnitSpan;
	
	const btcPrice = new Intl.NumberFormat(currencyObj.currencyLocale).format(currencyObj.btcPrice);

	const conversionOutput = (num) => {
		return num < 1 ? <Skulls howMany={1} /> : <span>{num.toFixed(0)}</span>;
	};

	if (currencyObj.noSubUnit) {
		conversionSubUnitSpan = null;
	} else {
		conversionSubUnitSpan = (
			<span className={styles.stats__conversion}>
				<span>Sats to a {currencyObj.subUnitNameSingular}:</span>
				{conversionOutput(currencyObj.satsPerSubUnit)}
			</span>
		);
	}

	return (
		<p className={styles.stats}>
			<span>
				1 BTC = {currencyObj.symbol}
				{btcPrice}
			</span>
			{conversionSubUnitSpan && conversionSubUnitSpan}
			{conversionMainUnitSpan && conversionMainUnitSpan}
		</p>
	);
}

export default Stats;
