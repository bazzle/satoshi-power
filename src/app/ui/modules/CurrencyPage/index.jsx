"use client"
import styles from "./CurrencyPage.module.scss"
import { useContext, useEffect, useState } from "react";
import { LiveDataContext } from "@/app/data/LiveDataContext";
import Loading from "@/app/ui/components/Loading";
import Converter from "@/app/ui/modules/CurrencyPage/Converter";

function CurrencyPage({slug}){
	const {liveData} = useContext(LiveDataContext);
	const [currencyObj, setCurrencyObj] = useState(null);
	useEffect(() => {
		if (!liveData) return;
		const code = slug.toUpperCase();
		setCurrencyObj(liveData[code]);
	}, [liveData, slug]);

	const loadingOutput = () => (
		<div className={styles.currencyPage__inner}>
			<Loading/>
		</div>
	)

	const successOutput = () => (
		<div className={styles.currencyPage__inner}>
			<h1 className={styles.currencyPage__title}>{currencyObj.displayName}</h1>
			<Converter convCurrency={currencyObj} />
		</div>
	)
	
	return currencyObj ? successOutput() : loadingOutput()
}

export default CurrencyPage;