'use client'

import { createContext, useState, useEffect  } from 'react'

export const SnapshotsDataContext = createContext<any | null>(null)

export function SnapshotsProvider({ children } : { children: React.ReactNode }) {
	const dataSource = '/data-snapshots/snapshots.json'
	const [snapshots, setSnapshots] = useState([])

	useEffect(() => {
		async function dataFetch(){
			try {
				const response = await fetch(dataSource)
				const parsedData = await response.json()
				setSnapshots(parsedData)
			}
			catch(error){
				console.error('No data', error)
			}
		}
		dataFetch()
	}, [])

	return (
		<SnapshotsDataContext.Provider value={{ snapshots }}>
			{children}
		</SnapshotsDataContext.Provider>
	)
}
