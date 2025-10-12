'use client'
import CurrencyItem from "./CurrencyItem";
import styles from "./Grid.module.scss";
import { LiveDataContext}  from "@/app/data/LiveDataContext";
import { SnapshotsDataContext } from "@/app/data/SnapshotsDataContext";
import { useState, useEffect, useContext } from "react";

export function Grid(){

	const {liveData} = useContext(LiveDataContext);
	const {snapshots} = useContext(SnapshotsDataContext);

	console.log(snapshots);

	if (liveData === null || snapshots === undefined){
		return <p className="flex-center padding">Loading...</p>
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