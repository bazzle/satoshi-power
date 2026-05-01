'use client'
import { useEffect, useState } from 'react'
import styles from './styles/Converter.module.scss'
import { NumberInput } from '@ark-ui/react/number-input'
import { RadioGroup } from '@ark-ui/react/radio-group'

function Converter({ itemObj } : { [key : string]: any }){
	const defaultSentence = 'Input number above for conversion'
	const [mode, setMode] = useState<string>('sats')
	const [inputNumber, setInputNumber] = useState<number | undefined | null>(undefined)
	const [outputSentence, setOutputSentence] = useState<React.ReactNode>(defaultSentence)
	const localiseNumber = (num : number) : string => {
		const output = new Intl.NumberFormat(itemObj.locale).format(num)
		return output
	}
	const toNumber = (s: string) => {
		if (!s) return null
		const cleaned = String(s).replace(/[^\d.,-]/g, '')
		// Replace all commas that are NOT at the end (i.e. thousands)
		const normalized = cleaned.replace(/,(\d{3})/g, '$1').replace(/,$/, '.')
		const num = parseFloat(normalized)
		return isNaN(num) ? null : num
	}

	// Run on load and when input number changes
	useEffect(() => {
		if (!inputNumber) return
		let outputValue
		let outputDisplay
		let outputString = <>defaultSentence</>
		let currencyString = itemObj.subUnitNameSingular
		let satPrice = itemObj.satPrice
		let satPriceSubUnit = itemObj.satPriceSubUnit
		let symbol = itemObj.symbol

		const satoshiLabelString = (num: any) => {
			const label = num === '1' ? 'Satoshi' : 'Satoshi\'s'
			num = num > 10 ? Math.round(num) : num
			num = localiseNumber(num)
			return `${num} ${label}`
		}

		if (mode === 'sats'){
			// sat price is the listed BTC price / 100m.
			// The price of one sat in the main unit of currency.
			const pretextString = `${satoshiLabelString(inputNumber)}`

			if (!itemObj.noSubUnit) {
				const outputValueSubUnit = inputNumber * satPriceSubUnit
				outputValue = inputNumber * satPrice
				// @ts-ignore there's no way this will be undefined
				const unitDisplaySubUnit = localiseNumber(outputValueSubUnit.toFixed(2))
				// @ts-ignore there's no way this will be undefined
				const unitDisplay = localiseNumber(outputValue.toFixed(2))
				// As default, display the small unit
				outputString = (
					<>{pretextString} = {unitDisplaySubUnit} {currencyString}</>
				)
				// When output subunits exceed 99 change to main unit
				if (outputValueSubUnit > 99){
					outputString = (
						<>{pretextString} =  {symbol}{unitDisplay}</>
					)
				}
			} else {
				outputValue = inputNumber * satPrice
				// @ts-ignore there's no way this will be undefined
				const unitDisplay = localiseNumber(outputValue.toFixed(2))
				outputString = (
					<>{pretextString} = {symbol}{unitDisplay}</>
				)
			}

		} else if (mode === 'subUnit') {

			if (itemObj.noSubUnit) {
				currencyString = itemObj.unitNameSingular
			}
			outputValue = inputNumber / satPrice / 100
			outputDisplay = outputValue.toFixed(2)
			outputString = (
				<p>{localiseNumber(inputNumber)} {currencyString} = {satoshiLabelString(outputDisplay)}</p>
			)

		} else if (mode === 'mainUnit') {
			currencyString = itemObj.symbol
			outputValue = inputNumber / satPrice
			outputDisplay = outputValue.toFixed(2)
			outputString = (
				<p>{currencyString}{localiseNumber(inputNumber)} = {satoshiLabelString(outputDisplay)}</p>
			)
		}

		setOutputSentence(outputString)

		if (
			inputNumber === 0 || inputNumber === undefined || inputNumber === null
		)
		{
			setOutputSentence(defaultSentence)
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputNumber, mode])

	const singularName = itemObj.unitNameSingular
	const activeUnitName = itemObj.subUnitKilled ? itemObj.unitNameSingular : itemObj.subUnitNameSingular

	const unitChoices = [
		'Satoshi',
	]

	if (itemObj.noSubUnit){ // Like KRW
		unitChoices.push(itemObj.unitNameSingular)
	} else {
		if (itemObj.subUnitKilled){ // Like Naira
			unitChoices.push(itemObj.unitNameSingular)
		} else { // Like USD
			unitChoices.push(itemObj.subUnitNameSingular)
			unitChoices.push(itemObj.unitNameSingular)
		}
	}

	const handleModeChange = (obj: Record<string, any>) => {
		if (obj.value === 'Satoshi'){
			setMode('sats')
		} else if (obj.value === itemObj.unitNameSingular) {
			setMode('mainUnit')
		} else {
			setMode('subUnit')
		}
		setInputNumber(null)
	}

	const handleValueChange = (num: string) => {
		setInputNumber(toNumber(num))
	}

	return (
		<div className={styles.converter}>

			<form className={styles.converter__form}>
				<NumberInput.Root
					min={1}
					step={1}
					value={String(inputNumber)}
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
