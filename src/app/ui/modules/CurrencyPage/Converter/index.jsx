'use client';
import { useEffect, useState } from "react";
import styles from "./styles/Converter.module.scss";
import { NumberInput } from '@ark-ui/react/number-input'
import { RadioGroup } from '@ark-ui/react/radio-group'
import Icons from '@/app/ui/misc/Icons'


function Converter({convCurrency}){
	const defaultSentence = 'Input number above!'
	const [mode, setMode] = useState('sats');
	const [inputNumber, setInputNumber] = useState();
	const [outputSentence, setOutputSentence] = useState(defaultSentence);
	// console.log(convCurrency)

	// Run on load and when input number changes
	useEffect(()=>{
		let outputValue
		let outputString
		let currencyString = convCurrency.displayName
		let satPrice
		if(convCurrency.noSubUnit){
			satPrice = convCurrency.satPrice
		} else if (convCurrency.subUnitKilled){
			satPrice = convCurrency.satPrice
		} else {
			satPrice = convCurrency.satPriceSubUnit
		}

		const checkNum = (n) => Number.isNaN(n) ? 0 : n;

		const satoshiLabelString = (num) => {
			const label = num === '1' ? 'Satoshi' : "Satoshi's"
			num = num > 10 ? Math.round(num) : num
			return `${num} ${label}`
		}
		const localiseCurrencyOutput = (price) => {
			return new Intl.NumberFormat(convCurrency.locale).format(price);
		}

		if(mode === 'sats'){

			outputValue = checkNum(inputNumber * satPrice);

			let unitDisplay
			if (convCurrency.noSubUnit) {
				// If there is no sub unit (like Won)
				unitDisplay = outputValue.toFixed(2)
				outputString = (
					<p>{satoshiLabelString(inputNumber)} = {unitDisplay} {currencyString}</p>
				)
			} else if (convCurrency.mainUnitKilled && convCurrency.subUnitKilled) {
				// If subunit is dead and the main unit also dead (like Naira), then don't show extra unit
				unitDisplay = outputValue.toFixed(2)
				outputString = (
					<p>{satoshiLabelString(inputNumber)} = {unitDisplay} {currencyString}</p>
				)
			} else if (convCurrency.subUnitKilled) {
				// If subunit is dead and the main unit is the counted unit (like Koruna), then don't show extra unit
				unitDisplay = outputValue.toFixed(2)
				outputString = (
					<p>{satoshiLabelString(inputNumber)} = {unitDisplay} {currencyString}</p>
				)
			} else if (!convCurrency.subUnitKilled) {
				// If subunit is still alive, show main unit when over 1
				const mainUnit = outputValue / 100;
				const showMainUnit = outputValue > 100
				const subUnitDisplay = showMainUnit ? outputValue.toFixed(0) : outputValue.toFixed(1)
				const mainUnitDisplay = (Math.floor(outputValue) / 100).toFixed(2);
				outputString = (
					<p>{satoshiLabelString(inputNumber)} = {subUnitDisplay} {currencyString} {showMainUnit && `/ ${convCurrency.symbol}${mainUnitDisplay} ${convCurrency.currencyCode}`}</p>
				)
			} else {
				unitDisplay = outputValue.toFixed(2)
				outputString = (
					<p>{satoshiLabelString(inputNumber)} = {unitDisplay} {currencyString}</p>
				)
			}

		} else if(mode === 'fiat') {

			outputValue = checkNum(inputNumber / satPrice);
			const outputDisplay = outputValue.toFixed(2);
			outputString = (
				<p>{inputNumber} {currencyString} = {satoshiLabelString(outputDisplay)}</p>
			)
		}

		if (inputNumber === 0 || inputNumber === undefined){
			setOutputSentence(defaultSentence);
		} else {
			setOutputSentence(outputString);
		}

	},[inputNumber, mode])

	const unitChoices = ['Sats',convCurrency.displayName];

	const handleModeChange = (mode) => {
		if(mode.value === "Sats"){
			setMode('sats')
		} else {
			setMode('fiat')
		}
		setInputNumber(0);
	}

	const handleValueChange = (num) => {
		setInputNumber(num);
	}

	return(
		<div className={styles.converter}>
			
			<form className={styles.converter__form}>
				<NumberInput.Root
					min={1}
					step={1}
					value={inputNumber}
					onValueChange={(details) => handleValueChange(details.value)}
				>
					<NumberInput.Label>Input number</NumberInput.Label>
					<NumberInput.Input placeholder="1"/>
						<NumberInput.Control>
							<NumberInput.IncrementTrigger>
								{Icons.arrow}
							</NumberInput.IncrementTrigger>
							<NumberInput.DecrementTrigger>
								{Icons.arrow}
							</NumberInput.DecrementTrigger>
					</NumberInput.Control>
				</NumberInput.Root>

				<RadioGroup.Root
					onValueChange={handleModeChange}
					defaultValue="Sats"
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

export default Converter;