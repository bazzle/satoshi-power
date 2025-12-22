export default function output({ currencyObj }){

	const btcPrice = new Intl.NumberFormat(currencyObj.currencyLocale).format(currencyObj.btcPrice);

	const satoshiLabelString = (num) => {
		const label = num === '1' ? 'Satoshi' : "Satoshi's"
		return `${num} ${label}`
	}

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
			conversionSubUnitSpan = `${subUnitsPerSat} ${currencyObj.subUnitNameSingular} ${'per sat'}`;
		} else {
			conversionSubUnitSpan = `${satoshiLabelString(satsPerSubUnit)} ${'per'} ${currencyObj.subUnitNameSingular}`;
		}
	}

	// Main unit
	if (currencyObj.mainUnitKilled) {
		conversionMainUnitSpan = `${unitsPerSat} ${currencyObj.unitNameSingular} ${'per sat'}`;
	} else {
		conversionMainUnitSpan = `${satoshiLabelString(satsPerUnit)} ${'per'} ${currencyObj.unitNameSingular}`;
	}

	const btcConv = `1 BTC = ${currencyObj.symbol}${btcPrice}`
	const satsMainUnit = conversionMainUnitSpan
	const satsSmallUnit = conversionSubUnitSpan ? conversionSubUnitSpan : null
	const combinedString = `${btcConv}, ${satsMainUnit} ${satsSmallUnit ? `, ${satsSmallUnit}` : ''}`

	const stringObj = {
		btcConv : btcConv,
		satsMainUnit : satsMainUnit,
		satsSmallUnit : satsSmallUnit,
		combinedString : combinedString.trim()
	}
	
	return stringObj

}