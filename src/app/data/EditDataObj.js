import Utilities from "@/app/ui/misc/Utilities";
import currenciesRef from './currenciesReference.json'

function checkCurrencyRefObject(obj){
	// Check all data values are present and the correct type before this goes out
	return (
		typeof obj.symbol === "string" &&
		typeof obj.unitName === "string" &&
		(typeof obj.subUnitName === "string" || "null") &&
		typeof obj.subUnits === "number" &&
		typeof obj.btcPrice === "number" &&
		typeof obj.satPrice === "number" &&
		typeof obj.satPriceSubUnit === "string" || "null" &&
		typeof obj.displayPrice === "number" &&
		typeof obj.percentage === "number" &&
		typeof obj.subUnitKilled === "boolean" &&
		typeof obj.mainUnitKilled === "boolean" &&
		typeof obj.displayName === "string" &&
		typeof obj.unitNameSlug === "string" &&
		typeof obj.displayNameSlug === "string" &&
		typeof obj.currencyCode === "string" &&
		typeof obj.currencyCodeSlug === "string" &&
		typeof obj.currencyLocale === "string" &&
		typeof obj.noSubUnit === "boolean"
	)
}

const currenciesObj = {};
function editDataObj(fetchedData){
	// Loop through the fetchedData
	for (const [key, itemObj] of Object.entries(fetchedData)) {
		// Get the itemcode format
		const itemCode = key.toLowerCase();
		// Find the matching currency object from the reflist
		const currencyRefObj = currenciesRef[itemCode];

		// If there is no match, then skip it
		if (currencyRefObj === undefined){
			console.log(`${key} Unmatched so skipped`);
			continue;
		}

		// Add new data to the object, from the currency list
		const currencyName = currencyRefObj.name;
		const currencyNameSlug = Utilities.slugify(currencyName);
		const newData = {
			'currencyCode' : key,
			'currencyCodeSlug' : Utilities.slugify(key),
			'unitName' : currencyName,
			'unitNameSlug' : currencyNameSlug,
			'symbol' : currencyRefObj.symbol,
			'subUnitName' : currencyRefObj.subunit,
			'subUnits' : currencyRefObj.subunit_to_unit,
			'btcPrice' : itemObj.sell ? Math.round(itemObj.sell) : 0,
			'currencyLocale' : currencyRefObj.locale
		}
		Object.assign(itemObj, newData);
		// Tidy up the object by deleting some keys we don't need
		delete itemObj['15m'];
		delete itemObj['buy'];
		delete itemObj['last'];
		delete itemObj['sell'];
		// Calculate price of a single sat
		itemObj.satPrice = itemObj.btcPrice / 100000000
		// check for if theres no sub unit
		const noSubUnit = (itemObj.subUnits === 1 || itemObj.subUnitName === null || itemObj.subUnitName === "");
		if(noSubUnit){
			itemObj.noSubUnit = true;
		} else {
			itemObj.noSubUnit = false;
		}
		// Calculate price of a single sat in sub units
		if(noSubUnit === false && itemObj.subUnits === 100){
			itemObj.satPriceSubUnit = itemObj.satPrice * 100
		} else {
			itemObj.satPriceSubUnit = null
		}

		// Mutate the subunit name so its correct -------------------------------

		if(!noSubUnit){
			const subUnitName = itemObj.subUnitName
			let subUnitNamePrefix = Utilities.removeLastWord(itemObj.unitName)
			// a couple of edge cases ---------
			if (subUnitNamePrefix === "") subUnitNamePrefix = itemObj.unitName;
			if(subUnitNamePrefix.includes('Renminbi')) subUnitNamePrefix = subUnitNamePrefix.replace('Renminbi', '');
			itemObj.subUnitName = `${subUnitNamePrefix} ${subUnitName}`;
		}

		// Set the display price and percentage ---------------------------------
		if(noSubUnit){
			itemObj.displayPrice = itemObj.satPrice
		} else {
			itemObj.displayPrice = itemObj.satPrice * itemObj.subUnits
		}
		itemObj.percentage = Utilities.getPercentage(itemObj.displayPrice)

		// Set the status -------------------------------------------------------
		
		if(noSubUnit){
			itemObj.subUnitKilled = false
			if (itemObj.percentage > 100){
				itemObj.mainUnitKilled = true
			} else {
				itemObj.mainUnitKilled = false
			}
		} else {
			if (itemObj.percentage > 100){
				itemObj.subUnitKilled = true
			} else {
				itemObj.subUnitKilled = false
			}
		}

		// Check for currencies with mainunit killed -----------------------------

		if(!noSubUnit){
			if(itemObj.subUnitKilled){
				itemObj.percentage = Math.round(itemObj.percentage / 100);
			}
			if(itemObj.subUnitKilled && itemObj.percentage > 100){
				itemObj.mainUnitKilled = true
			} else {
				itemObj.mainUnitKilled = false
			}
		}


		// Set the display name -------------------------------------------------

		let displayName
		// If the currency has no subunit, show main unit
		if(noSubUnit){
			displayName = itemObj.unitName
		} else {
			// If the percentage is over 100, display main unit, otherwise subunit
			if(itemObj.subUnitKilled){
				displayName = itemObj.unitName;
			} else {
				displayName = itemObj.subUnitName;
			}
		}
		itemObj.displayName = displayName

		// Set the display name slug --------------------------------------------

		itemObj.displayNameSlug = Utilities.slugify(displayName);

		// Set the scores (to dictate how many skulls) --------------------------
		{
			let score = 0
			if (itemObj.subUnitKilled || itemObj.mainUnitKilled) score = 1
			if (itemObj.subUnitKilled && itemObj.mainUnitKilled) score = 2
			itemObj.score = score
		}
		

		// Add to new object ----------------------------------------------------

		if (checkCurrencyRefObject(itemObj)){
			currenciesObj[key] = itemObj;
		} else {
			console.log('Missing data');
			continue;
		}

	}

	return currenciesObj;
}

export default editDataObj;