'use client'

import editData from "./EditData";
import CurrencyItem from "./CurrencyItem";
import styles from "./Grid.module.scss";
import { useState, useEffect } from "react";

export function Grid(){

	const dataUrl = "https://blockchain.info/ticker";
	const [fetchedData, setFetchedData] = useState(null);
	
	useEffect(() => {
		async function dataFetch(){
			try {
				const response = await fetch(dataUrl);
				const parsedData = await response.json();
				const currenciesArr = editData(parsedData);
				setFetchedData(currenciesArr);
			} catch(error) {
				console.error('No data', error);
			}
		}
		dataFetch();
	}, []);

	if (fetchedData === null){
		return <p>Loading</p>
	} else {
		return (
			<ul className={styles.grid}>
				{
					fetchedData.map((item, index) => {
						return <CurrencyItem key={index} itemObj={item} />;
					})
				}
			</ul>
		)
	}
}