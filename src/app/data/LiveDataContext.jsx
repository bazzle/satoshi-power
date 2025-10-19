'use client';
import { useState, useEffect, createContext } from "react";
import getDataPromise from "./getData.js";

export const LiveDataContext = createContext();

export function LiveDataProvider({children}){
	const [liveData, setLiveData] = useState(null);

	useEffect(() => {
		async function getData(){
			const data = await getDataPromise();
			setLiveData(data);
		}
		getData();
	}, [])

	// useEffect(() => {
	// 	console.log(liveData);
	// }, [liveData]);

	return (
		<LiveDataContext.Provider value={{ liveData }}>
			{children}
		</LiveDataContext.Provider>
	);

}