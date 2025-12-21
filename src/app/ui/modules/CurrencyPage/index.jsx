"use client"
import styles from "./CurrencyPage.module.scss"
import { useContext, useEffect, useState } from "react"
import { LiveDataContext } from "@/app/data/LiveDataContext"
import Loading from "@/app/ui/components/Loading"
import Converter from "@/app/ui/modules/CurrencyPage/Converter"
import Skulls from "@/app/ui/components/Skulls"
import Link from "next/link"
import Icons from "@/app/ui/misc/Icons"
import Stats from "./Stats"
import ShareButtons from "@/app/ui/components/ShareButtons"

function CurrencyPage({slug}){
	const {liveData} = useContext(LiveDataContext)
	const [currencyObj, setCurrencyObj] = useState(null)

	useEffect(() => {
		if (!liveData) return
		const code = slug.toUpperCase()
		setCurrencyObj(liveData[code])
	}, [liveData, slug])

	// console.log(currencyObj)

	const loadingOutput = () => (
		<div className={styles.currencyPage__inner}>
			<Loading/>
		</div>
	)
	
	const successOutput = () => {

		const title1 = currencyObj.noSubUnit || currencyObj.subUnitKilled ? currencyObj.demonym : `${currencyObj.subUnitName} /`
		const title2 = currencyObj.unitNameSingular
		const title3 = "to satoshi / bitcoin"

		return (
			<div className={styles.currencyPage__inner}>
				<h1 className={styles.currencyPage__title}>
					<span>{`${title1} ${title2}`}</span>
					<span>{title3}</span>
					<span><Skulls howMany={currencyObj.score}/></span>
				</h1>
				<div className={styles.currencyPage__stats}>
					<Stats currencyObj={currencyObj} />
				</div>
				<div className={styles.currencyPage__converter}>
					<Converter itemObj={currencyObj} />
				</div>
				<div className={styles.currencyPage__backLink}>
					{Icons.backArrow}
					<Link className={styles.currencyPage__backLink__link} href="/">Return to index</Link>
				</div>
			</div>
		)
	}
	
	return currencyObj ? successOutput() : loadingOutput()
}

export default CurrencyPage