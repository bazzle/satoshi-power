'use client'

import { createContext, useContext, useState, useEffect  } from "react";

export const SnapshotsContext = createContext();

export function SnapshotsProvider({ children }) {
	const dataSource = '/data-snapshots/snapshots.json';
	const [snapshots, setSnapshots] = useState([]);

	useEffect(() => {
		async function dataFetch(){
			try{
				const response = await fetch(dataSource);
				const parsedData = await response.json();
				setSnapshots(parsedData);
			}
			catch(error){
				console.error('No data', error);
			}
		}
		dataFetch();
	}, []);

	return (
		<SnapshotsContext.Provider value={{ snapshots }}>
			{children}
		</SnapshotsContext.Provider>
	);
}
