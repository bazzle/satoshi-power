import editData from "./editData";

type NotOutput = {
	satPrice : number,
	sell : number,
	percentage : number,
	[key: string]: unknown
}

export type ItemObjType = {
	btcPrice : number,
	displayName : string,
	displayPercentage : number,
	displayPrice : number,
	smallUnitKilled : boolean,
	subUnitName : string,
	subUnits : number,
	symbol : string,
	unitName : string,
} & Partial<NotOutput>

export function Grid(){

	const dataUrl = "https://blockchain.info/ticker";

	let fetchedData: ItemObjType[];
	
	async function DataFetchDisplay(){
		try {
			const response = await fetch(dataUrl);
			fetchedData = await response.json();
		} catch(error) {
			console.error('No data', error);
		} finally {
			const currenciesArr = editData(fetchedData);
		}
	}
	
	
	return (
		<div className="grid">
			<>
				{DataFetchDisplay()}
			</>
		</div>
	)
}