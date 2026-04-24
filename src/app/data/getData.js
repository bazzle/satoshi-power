import editDataObj from './EditDataObj'

const getDataPromise = async () => {
	try {
		const response = await fetch('https://blockchain.info/ticker')
		const parsedData = await response.json()
		const editedData = editDataObj(parsedData)
		console.log(editedData)
		return editedData
	} catch(error) {
		console.error(error)
		return {}
	}
}

export default getDataPromise
