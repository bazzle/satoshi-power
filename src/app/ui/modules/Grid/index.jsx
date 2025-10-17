'use client'
import CurrencyItem from "./CurrencyItem";
import styles from "./Grid.module.scss";
import { LiveDataContext}  from "@/app/data/LiveDataContext";
import { SnapshotsDataContext } from "@/app/data/SnapshotsDataContext";
import { useContext } from "react";
import Loading from "@/app/ui/components/Loading";

export function Grid(){

	const {liveData} = useContext(LiveDataContext);
	const {snapshots} = useContext(SnapshotsDataContext);

	if (liveData === null || snapshots === undefined){
		return (
			<div className={styles.loader}>
				<Loading/>
			</div>
		)
	} else {
		return (
			<ul className={styles.grid}>
				{
					liveData.map((item, index) => {
						return <CurrencyItem key={index} itemObj={item} />;
					})
				}
			</ul>
		)
	}
}