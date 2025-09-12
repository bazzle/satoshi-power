import editData from "./EditData";
import CurrencyItem from "./CurrencyItem";

export function Grid(){

	const dataUrl = "https://blockchain.info/ticker";

	let fetchedData: [];
	
	async function DataFetchDisplay(){
		try {
			const response = await fetch(dataUrl);
			fetchedData = await response.json();
		} catch(error) {
			console.error('No data', error);
		} finally {
			const currenciesArr = editData(fetchedData);
			return (
				currenciesArr.map((item, index) => {
					return <CurrencyItem key={index} itemObj={item} />;
				})
			)
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