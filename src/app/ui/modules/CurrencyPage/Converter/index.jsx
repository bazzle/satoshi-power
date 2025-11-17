'use client';
import { useEffect, useState } from "react";
import styles from "./styles/Converter.module.scss";
import { NumberInput } from '@ark-ui/react/number-input'
import { RadioGroup } from '@ark-ui/react/radio-group'
import Icons from '@/app/ui/misc/Icons'


function Converter({convCurrency}){
	const defaultSentence = 'Input number above for conversion'
	const [mode, setMode] = useState('sats');
	const [inputNumber, setInputNumber] = useState();
	const [outputSentence, setOutputSentence] = useState(defaultSentence);
	const localiseNumber = (num) => {
		return new Intl.NumberFormat(convCurrency.locale).format(num);
	}

	// Run on load and when input number changes
	useEffect(()=>{
		let outputValue
		let outputString
		let currencyString = convCurrency.displayName
		let currencyStringMain = convCurrency.unitName
		let satPrice = convCurrency.satPrice
		let satPriceSubUnit = convCurrency.satPriceSubUnit
		let symbol = convCurrency.symbol

		const checkNum = (n) => Number.isNaN(n) ? 0 : n;

		const satoshiLabelString = (num) => {
			const label = num === '1' ? 'Satoshi' : "Satoshi's"
			num = num > 10 ? Math.round(num) : num
			num = localiseNumber(num);
			return `${num} ${label}`
		}

		if(mode === 'sats'){
			// sat price is the listed BTC price / 100m.
			// The price of one sat in the main unit of currency.
			const pretextString = `${satoshiLabelString(inputNumber)}`;

			if (!convCurrency.noSubUnit) {
				// show main unit when over 1
				const outputValueSubUnit = checkNum(inputNumber * satPriceSubUnit);
				outputValue = checkNum(inputNumber * satPrice);
				const showMainUnit = outputValueSubUnit > 100
				const unitDisplaySubUnit = localiseNumber(outputValueSubUnit.toFixed(2));
				const unitDisplay = localiseNumber(outputValue.toFixed(2));

				if (showMainUnit) {
					outputString = (
						<>{pretextString} = {symbol}{unitDisplay}</>
					)
				} else {
					outputString = (
						<>{pretextString} = {unitDisplaySubUnit} {currencyString}</>
					)
				}
			} else {
				outputValue = checkNum(inputNumber * satPrice);
				const unitDisplay = localiseNumber(outputValue.toFixed(2));
				outputString = (
					<>{pretextString} = {unitDisplay} {currencyString}</>
				)
			}


		} else if(mode === 'fiat') {

			outputValue = checkNum(inputNumber / satPrice);
			const outputDisplay = outputValue.toFixed(2);
			outputString = (
				<p>{inputNumber} {currencyString} = {satoshiLabelString(outputDisplay)}</p>
			)
		}

		if (
			inputNumber === '0' ||
			inputNumber === '' ||
			inputNumber === undefined ||
			inputNumber === null
		){
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
		setInputNumber(null);
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