'use client';
import editDataObj from "./EditDataObj";
import { useState, useEffect, createContext } from "react";

export const LiveDataContext = createContext();

export function LiveDataProvider({children}){
	const dataUrl = "https://blockchain.info/ticker";
	const [liveData, setLiveData] = useState(null);

	useEffect(() => {
		async function dataFetch(){
			try {
				const response = await fetch(dataUrl);
				const parsedData = await response.json();
				const currenciesArr = editDataObj(parsedData);
				setLiveData(currenciesArr);
			} catch(error) {
				console.error('No data', error);
			}
		}
		dataFetch();
	}, []);
	useEffect(() => {
		console.log(liveData);
	}, [liveData]);
	return (
		<LiveDataContext.Provider value={{ liveData }}>
			{children}
		</LiveDataContext.Provider>
	);

}