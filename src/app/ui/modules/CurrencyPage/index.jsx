"use client"
import styles from "./CurrencyPage.module.scss"
import { useContext, useEffect, useState } from "react";
import { LiveDataContext } from "@/app/data/LiveDataContext";
import Loading from "@/app/ui/components/Loading";
import Converter from "@/app/ui/modules/CurrencyPage/Converter";
import Skulls from "@/app/ui/components/Skulls";
import Link from "next/link";
import Icons from "@/app/ui/misc/Icons";
import Stats from "./Stats"

function CurrencyPage({slug}){
	const {liveData} = useContext(LiveDataContext);
	const [currencyObj, setCurrencyObj] = useState(null);

	useEffect(() => {
		if (!liveData) return;
		const code = slug.toUpperCase();
		setCurrencyObj(liveData[code]);
	}, [liveData, slug]);

	console.log(currencyObj)

	const loadingOutput = () => (
		<div className={styles.currencyPage__inner}>
			<Loading/>
		</div>
	)
	
	const successOutput = () => {

		const titlePrefix = currencyObj.noSubUnit || currencyObj.subUnitKilled ? currencyObj.demonym : `${currencyObj.subUnitName} /`;
		const titleSuffix = currencyObj.unitNameSingular;

		return (
			<div className={styles.currencyPage__inner}>
				<h1 className={styles.currencyPage__title}>
					{`${titlePrefix} ${titleSuffix}`}
					<Skulls howMany={currencyObj.score}/>
				</h1>
				<div className={styles.currencyPage__stats}>
					<Stats currencyObj={currencyObj} />
				</div>
				<div className={styles.currencyPage__converter}>
					<Converter convCurrency={currencyObj} />
				</div>
				<Link className={styles.currencyPage__backLink} href="/">{Icons.backArrow} Return to index</Link>
			</div>
		)
	}
	
	return currencyObj ? successOutput() : loadingOutput()
}

export default CurrencyPage