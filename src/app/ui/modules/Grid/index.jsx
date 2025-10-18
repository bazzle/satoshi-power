'use client'
import CurrencyItem from "./CurrencyItem";
import styles from "./Grid.module.scss";
import { LiveDataContext}  from "@/app/data/LiveDataContext";
import { useContext, useEffect } from "react";
import Loading from "@/app/ui/components/Loading";

export function Grid(){

	const {liveData} = useContext(LiveDataContext);
	const liveDataArr = liveData ? Object.values(liveData) : [];
	liveDataArr.sort((a, b) => a.percentage - b.percentage);

	const gridOutput = () => (
		<ul className={styles.grid__grid}>
			{
				liveDataArr.map((item, index) => {
					return <CurrencyItem key={index} itemObj={item} />;
				})
			}
		</ul>
	)
	const loadingOutput = () => (
		<div className={styles.grid__loader}>
			<Loading/>
		</div>
	)

	return (
		<div className={styles.grid__container}>
			{ liveData === null ? loadingOutput() : gridOutput() }
		</div>
	)
}