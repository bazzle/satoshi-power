'use client'
import { useState, useEffect, createContext } from 'react'
import getDataPromise from './getData.ts'

export const LiveDataContext = createContext<any>(null)

export function LiveDataProvider({ children }: { children: React.ReactNode }){
	const [liveData, setLiveData] = useState<any>(null)

	useEffect(() => {
		async function getData(){
			const data = await getDataPromise()
			setLiveData(data)
		}
		getData()
	}, [])

	return (
		<LiveDataContext.Provider value={{ liveData }}>
			{children}
		</LiveDataContext.Provider>
	)

}
