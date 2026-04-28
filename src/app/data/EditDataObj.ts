import Utilities from '@/app/ui/misc/Utilities'
import currenciesRef from './currenciesReference.json'

function checkCurrencyRefObject(obj: any){
	// Check all data values are present and the correct type
	return (
		typeof obj.symbol === 'string' &&
		typeof obj.unitName === 'string' &&
		typeof obj.unitNameSingular === 'string' &&
		typeof obj.subUnits === 'number' &&
		typeof obj.btcPrice === 'number' &&
		typeof obj.satPrice === 'number' &&
		typeof obj.satsPerUnit === 'number' &&
		typeof obj.displayPrice === 'number' &&
		typeof obj.percentage === 'number' &&
		typeof obj.subUnitKilled === 'boolean' &&
		typeof obj.mainUnitKilled === 'boolean' &&
		typeof obj.displayName === 'string' &&
		typeof obj.demonym === 'string' &&
		typeof obj.unitNameSlug === 'string' &&
		typeof obj.displayNameSlug === 'string' &&
		typeof obj.currencyCode === 'string' &&
		typeof obj.currencyCodeSlug === 'string' &&
		typeof obj.currencyLocale === 'string' &&
		typeof obj.noSubUnit === 'boolean' &&
		(obj.subUnitName === undefined || typeof obj.subUnitName === 'string') &&
		(obj.subUnitNameSingular === undefined || typeof obj.subUnitNameSingular === 'string') &&
		(obj.satsPerSubUnit === undefined || typeof obj.satsPerSubUnit === 'number') &&
		(obj.satPriceSubUnit === undefined || typeof obj.satPriceSubUnit === 'number')
	)
}

const excluded = ['GHS']

function editDataObj(fetchedData: { [key : string]: any }){
	let currenciesObj : { [key: string]: any } = {}
	// Loop through the fetchedData
	for (const [key, itemObj] of Object.entries(fetchedData)) {
		// Get the itemcode format
		const itemCode = key.toLowerCase()
		// Find the matching currency object from the reflist
		const currencyRefObj = (currenciesRef as { [key: string]: any })[itemCode]

		// If there is no match, then skip it
		if (currencyRefObj === undefined){
			console.log(`${key} Unmatched so skipped`)
			continue
		}
		// If excluded, then skip it
		if (excluded.includes(key)){
			console.log(`${key} excluded so skipped`)
			continue
		}

		// Base data from currency list / API -----------------------------------
		const currencyName = currencyRefObj.name
		const currencyNameSlug = Utilities.slugify(currencyName)
		const btcPrice = itemObj.sell ? Math.round(itemObj.sell) : 0
		const subUnits = currencyRefObj.subunit_to_unit
		const subUnitNameRaw = currencyRefObj.subunit

		// Derived values -------------------------------------------------------
		const satPrice = btcPrice / 100000000
		const noSubUnit = (subUnits === 1 || subUnitNameRaw === null || subUnitNameRaw === '')

		const satPriceSubUnit = noSubUnit ? undefined : satPrice * 100
		const satsPerUnit = 1 / satPrice
		const satsPerSubUnit = noSubUnit ? undefined : satsPerUnit / 100
		const unitsPerSat = 1 / satsPerUnit
		const subUnitsPerSat = noSubUnit || satsPerSubUnit === undefined ? undefined : 1 / satsPerSubUnit

		let subUnitNameMutated
		if (noSubUnit){
			subUnitNameMutated = undefined
		} else {
			let subUnitNamePrefix = Utilities.removeLastWord(currencyName)
			if (subUnitNamePrefix === '') subUnitNamePrefix = currencyName
			if (subUnitNamePrefix.includes('Renminbi')) {
				subUnitNamePrefix = subUnitNamePrefix.replace('Renminbi', '')
			}
			subUnitNameMutated = `${subUnitNamePrefix} ${subUnitNameRaw}`
		}

		const displayPrice = noSubUnit ? satPrice : satPrice * subUnits

		let percentage = Utilities.getPercentage(displayPrice)

		let subUnitKilled = false
		let mainUnitKilled = false

		if (noSubUnit){
			subUnitKilled = false
			mainUnitKilled = percentage > 100
		} else {
			subUnitKilled = percentage > 100
		}

		let subUnitNameSingular = null
		if (noSubUnit){
			subUnitNameSingular = undefined
		}
		else {
			if (subUnitKilled){
				percentage = Math.round(percentage / 100)
			}
			if (subUnitKilled && percentage > 100){
				mainUnitKilled = true
			} else {
				mainUnitKilled = false
			}
			if (subUnitNameMutated) {
				subUnitNameSingular = subUnitNameMutated.trim().split(' ').pop()
			}
		}

		let displayName
		if (noSubUnit){
			displayName = currencyName
		} else if (subUnitKilled){
			displayName = currencyName
		} else {
			displayName = subUnitNameMutated
		}

		const demonym = displayName.trim().split(' ').slice(0, -1).join(' ')
		const unitNameSingular = currencyName.trim().split(' ').pop()
		const displayNameSlug = Utilities.slugify(displayName)

		let score = 0
		if (subUnitKilled || mainUnitKilled) score = 1
		if (subUnitKilled && mainUnitKilled) score = 2

		// Final newData object -------------------------------------------------
		const newData = {
			'currencyCode': key,
			'currencyCodeSlug': Utilities.slugify(key),
			'unitName': currencyName,
			'unitNameSlug': currencyNameSlug,
			'symbol': currencyRefObj.symbol,
			'subUnitName': subUnitNameMutated,
			'subUnits': subUnits,
			'btcPrice': btcPrice,
			'currencyLocale': currencyRefObj.locale,
			'satPrice': satPrice,
			'satPriceSubUnit': satPriceSubUnit,
			'satsPerUnit': satsPerUnit,
			'satsPerSubUnit': satsPerSubUnit,
			'unitsPerSat': unitsPerSat,
			'subUnitsPerSat': subUnitsPerSat,
			'noSubUnit': noSubUnit,
			'displayPrice': displayPrice,
			'percentage': percentage,
			'subUnitKilled': subUnitKilled,
			'mainUnitKilled': mainUnitKilled,
			'subUnitNameSingular': subUnitNameSingular,
			'displayName': displayName,
			'demonym': demonym,
			'unitNameSingular': unitNameSingular,
			'displayNameSlug': displayNameSlug,
			'score': score,
		}

		// Add to new object ----------------------------------------------------

		if (checkCurrencyRefObject(newData)){
			currenciesObj[key] = { ...newData }
		}

	}

	return currenciesObj
}

export default editDataObj
