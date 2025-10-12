'use client';

import editData from "./EditData";
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
				const currenciesArr = editData(parsedData);
				setLiveData(currenciesArr);
			} catch(error) {
				console.error('No data', error);
			}
		}
		dataFetch();
	}, []);
	return (
		<LiveDataContext.Provider value={{ liveData }}>
			{children}
		</LiveDataContext.Provider>
	);

}