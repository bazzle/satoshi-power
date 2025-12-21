'use client'
import { useEffect, useState } from "react"
import styles from "./styles/Converter.module.scss"
import { NumberInput } from '@ark-ui/react/number-input'
import { RadioGroup } from '@ark-ui/react/radio-group'
import Icons from '@/app/ui/misc/Icons'


function Converter({itemObj}){
	const defaultSentence = 'Input number above for conversion'
	const [mode, setMode] = useState('sats')
	const [inputNumber, setInputNumber] = useState()
	const [outputSentence, setOutputSentence] = useState(defaultSentence)
	const localiseNumber = (num) => {
		return new Intl.NumberFormat(itemObj.locale).format(num)
	}
	const toNumber = (s) => {
		if (!s) return null
		const cleaned = String(s).replace(/[^\d.,-]/g, '')
		// Replace all commas that are NOT at the end (i.e. thousands)
		const normalized = cleaned.replace(/,(\d{3})/g, '$1').replace(/,$/, '.')
		const num = parseFloat(normalized)
		return isNaN(num) ? null : num
	}

	// Run on load and when input number changes
	useEffect(()=>{
		console.log(itemObj)
		let outputValue
		let outputDisplay
		let outputString
		let currencyString = itemObj.subUnitNameSingular
		let currencyStringMain = itemObj.unitName
		let satPrice = itemObj.satPrice
		let satPriceSubUnit = itemObj.satPriceSubUnit
		let symbol = itemObj.symbol

		const checkNum = (n) => Number.isNaN(n) ? 0 : n

		const satoshiLabelString = (num) => {
			const label = num === '1' ? 'Satoshi' : "Satoshi's"
			num = num > 10 ? Math.round(num) : num
			num = localiseNumber(num)
			return `${num} ${label}`
		}

		if(mode === 'sats'){
			// sat price is the listed BTC price / 100m.
			// The price of one sat in the main unit of currency.
			const pretextString = `${satoshiLabelString(inputNumber)}`

			if (!itemObj.noSubUnit) {
				const outputValueSubUnit = checkNum(inputNumber * satPriceSubUnit)
				outputValue = checkNum(inputNumber * satPrice)
				const unitDisplaySubUnit = localiseNumber(outputValueSubUnit.toFixed(2))
				const unitDisplay = localiseNumber(outputValue.toFixed(2))
				// As default, display the small unit
				outputString = (
					<>{pretextString} = {unitDisplaySubUnit} {currencyString}</>
				)
				// When output subunits exceed 99 change to main unit
				if(outputValueSubUnit > 99){
					outputString = (
						<>{pretextString} =  {symbol}{unitDisplay}</>
					)
				}
			} else {
				outputValue = checkNum(inputNumber * satPrice)
				const unitDisplay = localiseNumber(outputValue.toFixed(2))
				outputString = (
					<>{pretextString} = {symbol}{unitDisplay}</>
				)
			}

		} else if(mode === 'subUnit') {

			if (itemObj.noSubUnit) {
				currencyString = itemObj.unitNameSingular
			}
			outputValue = checkNum(inputNumber / satPrice / 100)
			outputDisplay = outputValue.toFixed(2)
			outputString = (
				<p>{localiseNumber(inputNumber)} {currencyString} = {satoshiLabelString(outputDisplay)}</p>
			)

		} else if(mode === 'mainUnit') {
			currencyString = itemObj.symbol
			outputValue = checkNum(inputNumber / satPrice)
			outputDisplay = outputValue.toFixed(2)
			outputString = (
				<p>{currencyString}{localiseNumber(inputNumber)} = {satoshiLabelString(outputDisplay)}</p>
			)
		}

		setOutputSentence(outputString)

		if (
			inputNumber === '0' ||
			inputNumber === '' ||
			inputNumber === undefined ||
			inputNumber === null
		)
		{
			setOutputSentence(defaultSentence)
		}

	},[inputNumber, mode])
	
	const singularName = itemObj.unitNameSingular
	const activeUnitName = itemObj.subUnitKilled ? itemObj.unitNameSingular : itemObj.subUnitNameSingular

	const unitChoices = [
		'Satoshi'
	]

	if(itemObj.noSubUnit){ // Like KRW
		unitChoices.push(itemObj.unitNameSingular)
	} else{
		if (itemObj.subUnitKilled){ // Like Naira
			unitChoices.push(itemObj.unitNameSingular)
		} else { // Like USD
			unitChoices.push(itemObj.subUnitNameSingular)
			unitChoices.push(itemObj.unitNameSingular)
		}
	}

	const handleModeChange = (mode) => {
		if(mode.value === "Satoshi"){
			setMode('sats')
		} else if(mode.value === itemObj.unitNameSingular) {
			setMode('mainUnit')
		} else {
			setMode('subUnit')
		}
		setInputNumber(null)
	}

	const handleValueChange = (num) => {
		setInputNumber(toNumber(num))
	}

	return(
		<div className={styles.converter}>
			
			<form className={styles.converter__form}>
				<NumberInput.Root
					min={1}
					step={1}
					value={inputNumber}
					locale="en-US"
					onValueChange={(details) => handleValueChange(details.value)}
				>
					<NumberInput.Label>Input number</NumberInput.Label>
					<NumberInput.Input placeholder="1"/>
				</NumberInput.Root>

				<RadioGroup.Root
					onValueChange={handleModeChange}
					defaultValue={unitChoices[0]}
				>
					<RadioGroup.Label>Unit</RadioGroup.Label>
					<RadioGroup.Indicator />
					{unitChoices.map((unitChoice) => (
						<RadioGroup.Item key={unitChoice} value={unitChoice}>
							<RadioGroup.ItemText>{unitChoice}</RadioGroup.ItemText>
							<RadioGroup.ItemControl />
							<RadioGroup.ItemHiddenInput />
						</RadioGroup.Item>
					))}
				</RadioGroup.Root>
			</form>

			<output className={styles.converter__output}>
				{outputSentence}
			</output>

		</div>
	)
}

export default Converter