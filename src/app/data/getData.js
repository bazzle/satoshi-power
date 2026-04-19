import editDataObj from './EditDataObj'

const getDataPromise = async () => {
	try {
		const response = await fetch('https://blockchain.info/ticker')
		const parsedData = await response.json()
		return editDataObj(parsedData)
	} catch(error) {
		console.error(error)
		return {}
	}
}

export default getDataPromise
