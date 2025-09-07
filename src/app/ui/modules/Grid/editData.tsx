import { ItemObjType } from "./index";
import currencyReference from "@/app/data/currencies";
import Utilities from "@/app/ui/misc/Utilities";

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



		// If the currency doesn't have a subunit, the display name and price is the main unit
		if(
			itemObj.subUnits === 1 ||
			itemObj.subUnitName === null ||
			itemObj.subUnitName === ""
		){
			// Set display price, percentage and name which will display on the front-end
			itemObj.displayPrice = itemObj.satPrice
			itemObj.percentage = Utilities.getPercentage(itemObj.displayPrice)
			itemObj.displayPercentage = Utilities.getPercentage(itemObj.displayPrice)
			itemObj.displayName = itemObj.unitName
			if(itemObj.displayPercentage > 100){
				itemObj.mainUnitKilled = true
			}
		} else {
			// As the sub unit name isn't prefixed by the country, add it here
			let namePrefix
			namePrefix = Utilities.removeLastWord(itemObj.unitName)
			if (namePrefix === ""){
				namePrefix = itemObj.unitName
			}
			// Some fixes
			if(namePrefix.includes('Renminbi')){
				namePrefix = namePrefix.replace('Renminbi', '');
			}
			itemObj.subUnitName = `${namePrefix ? namePrefix : ''} ${itemObj.subUnitName}`
			// The display price will be the satprice multiplied by how many subunits make up the unit
			itemObj.displayPrice = itemObj.satPrice * itemObj.subUnits
			// Set percentage and if the percentage is over 100, we will show the main unit on the front-end
			itemObj.percentage = Utilities.getPercentage(itemObj.displayPrice)
			if (itemObj.percentage > 100){
				itemObj.displayPrice = itemObj.satPrice
				itemObj.displayPercentage = Utilities.getPercentage(itemObj.displayPrice)
				itemObj.displayName = itemObj.unitName
				itemObj.smallUnitKilled = true
				if(itemObj.displayPercentage > 100){
					itemObj.mainUnitKilled = true
				}
			} else {
				itemObj.displayName = itemObj.subUnitName
				itemObj.displayPercentage = Utilities.getPercentage(itemObj.displayPrice)
			}
		}
		currenciesArr.push(itemObj);
	}
	currenciesArr.sort((a, b) => a.displayPercentage - b.displayPercentage);
	
	return currenciesArr;
}

export default editData;