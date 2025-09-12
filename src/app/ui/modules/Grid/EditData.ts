import currencyReference from "@/app/data/currencies";
import Utilities from "@/app/ui/misc/Utilities";

function isItemObjNewType(obj: any){
	return (
		typeof obj.symbol === "string" &&
		typeof obj.unitName === "string" &&
		(typeof obj.subUnitName === "string" || "null") &&
		typeof obj.subUnits === "number" &&
		typeof obj.btcPrice === "number" &&
		typeof obj.satPrice === "number" &&
		typeof obj.displayPrice === "number" &&
		typeof obj.percentage === "number" &&
		typeof obj.subUnitKilled === "boolean" &&
		typeof obj.mainUnitKilled === "boolean" &&
		typeof obj.displayName === "string"
	)
}

function editData(fetchedData: ItemObjType[] ){
	const currenciesArr: ItemObjType[] = [];
	
	for (const currencyItem in fetchedData){
		// Set some variables
		const itemObj: ItemObjType = fetchedData[currencyItem];
		const itemCode = itemObj.symbol.toLowerCase();
		const currencyAddDetails = currencyReference[itemCode];

		// If matching object isn't found, skip it
		if (currencyAddDetails === undefined){
			continue;
		}

		// Add new data to the object, from the currency list
		const newData = {
			'unitName' : currencyAddDetails.name,
			'symbol' : currencyAddDetails.symbol,
			'subUnitName' : currencyAddDetails.subunit,
			'subUnits' : currencyAddDetails.subunit_to_unit,
			'btcPrice' : itemObj.sell ? Math.round(itemObj.sell) : 0
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
				itemObj.percentage = Math.floor(itemObj.percentage / 100);
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



		// Check data at runtime

		if (isItemObjNewType(itemObj)){
			currenciesArr.push(itemObj);
		} else {
			console.error(itemObj.displayName);
		}

	}



	currenciesArr.sort((a, b) => a.percentage - b.percentage);

	console.log(currenciesArr);
	
	return currenciesArr;
}

export default editData;