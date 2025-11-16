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
		console.log(currencyObj)
		const titleSuffix = !currencyObj.noSubUnit ? ` / ${currencyObj.unitNameSingular}`: '';
		const title = currencyObj.unitName + titleSuffix
		let conversionSubUnit;
		if (currencyObj.noSubUnit){
			conversionSubUnit = null
		} else {
			conversionSubUnit = (
				<>
				<span>Sats to a {currencyObj.subUnitNameSingular} = {432}</span>
				<span className={styles.currencyPage__stats__divider}>—</span>
				</>
			)
		}
		return (
			<div className={styles.currencyPage__inner}>
				<h1 className={styles.currencyPage__title}>
					{title}
					<Skulls howMany={currencyObj.score}/>
				</h1>
				<p className={styles.currencyPage__stats}>
					<span>1 BTC = {currencyObj.symbol}{btcPrice}</span>
					<span className={styles.currencyPage__stats__divider}>—</span>
					{conversionSubUnit && conversionSubUnit}
					<span>Sats to a {currencyObj.unitNameSingular} = 200</span>
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