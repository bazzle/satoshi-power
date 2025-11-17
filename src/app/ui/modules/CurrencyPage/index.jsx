"use client"
import styles from "./CurrencyPage.module.scss"
import { useContext, useEffect, useState } from "react";
import { LiveDataContext } from "@/app/data/LiveDataContext";
import Loading from "@/app/ui/components/Loading";
import Converter from "@/app/ui/modules/CurrencyPage/Converter";
import Skulls from "@/app/ui/components/Skulls";
import Link from "next/link";
import Icons from "@/app/ui/misc/Icons";

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
	
	const successOutput = () => {
		const btcPrice = new Intl.NumberFormat(currencyObj.currencyLocale).format(currencyObj.btcPrice);
		// console.log(currencyObj)
		let titlePrefix = ''
		let titleSuffix = ''
		let conversionSubUnitSpan;
		let conversionMainUnitSpan;
		const conversionOutput = (num) => {
			return num < 1 ? <Skulls howMany={1}/> : <span>{num.toFixed(0)}</span>;
		}
		if (currencyObj.noSubUnit){
			conversionSubUnitSpan = null
			titlePrefix = currencyObj.unitName;
		} else {
			titlePrefix = currencyObj.subUnitName;
			titleSuffix = ` / ${currencyObj.unitNameSingular}`;
			conversionSubUnitSpan = (
				<span className={styles.currencyPage__stats__conversion}>
					<span>Sats to a {currencyObj.subUnitNameSingular}:</span>
					{conversionOutput(currencyObj.satsPerSubUnit)}
				</span>
			)
		}
		conversionMainUnitSpan = (
			<span className={styles.currencyPage__stats__conversion}>
				<span>Sats to a {currencyObj.unitNameSingular}:</span>
				{conversionOutput(currencyObj.satsPerUnit)}
			</span>
		)
		return (
			<div className={styles.currencyPage__inner}>
				<h1 className={styles.currencyPage__title}>
					{titlePrefix + titleSuffix}
				</h1>
				<p className={styles.currencyPage__stats}>
					<span>1 BTC = {currencyObj.symbol}{btcPrice}</span>
					{conversionSubUnitSpan && conversionSubUnitSpan}
					{conversionMainUnitSpan && conversionMainUnitSpan}
				</p>
				<div className={styles.currencyPage__converter}>
					<Converter convCurrency={currencyObj} />
				</div>
				<Link className={styles.currencyPage__backLink} href="/">{Icons.backArrow} Return to index</Link>
			</div>
		)
	}
	
	return currencyObj ? successOutput() : loadingOutput()
}

export default CurrencyPage;