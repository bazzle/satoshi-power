'use client';
import { useEffect, useState } from "react";
import styles from "./Converter.module.scss";
import { NumberInput } from '@ark-ui/react/number-input'
import { RadioGroup } from '@ark-ui/react/radio-group'


function Converter({convCurrency}){
	const [mode, setMode] = useState('sats');
	const [inputNumber, setInputNumber] = useState(1);
	const [inputNumberFormDisplay, setInputNumberFormDisplay] = useState();
	const [outputString, setOutputString] = useState('');

	// Run on load and when input number changes
	useEffect(()=>{
		console.log(convCurrency);
		let OutputRawNum
		let outputValue
		let outputString
		let currencyString = convCurrency.displayName
		let satPrice
		if(convCurrency.satPriceSubUnit && convCurrency.subUnitKilled){
			satPrice = convCurrency.satPrice
		} else {
			satPrice = convCurrency.satPriceSubUnit
		}
		const satoshiLabelString = (num) => {
			const label = num === 1 ? 'Satoshi' : "Satoshi's"
			return `${num.toLocaleString()} ${label} `;
		}
		if(mode === 'sats'){
			OutputRawNum = inputNumber * satPrice;
			outputValue = Number(Number(OutputRawNum).toFixed(2));
			outputString = (
				<p>{satoshiLabelString(inputNumber)} = {currencyString} {outputValue}</p>
			)
		} else if(mode === 'fiat') {
			OutputRawNum = inputNumber / satPrice;
			outputValue = Number(Number(OutputRawNum).toFixed(2));
			outputString = (
				<p>{inputNumber} {currencyString} = {satoshiLabelString(outputValue)}</p>
			)
		}
		setInputNumberFormDisplay(inputNumber);
		setOutputString(outputString);
	},[inputNumber, mode])

	const unitChoices = ['Sats',convCurrency.displayName];

	return(
		<div className={styles.converter}>
			<form className={styles.converter__form}>
				<NumberInput.Root
					min={1}
					step={1}
					value={inputNumberFormDisplay}
					onValueChange={(num) => setInputNumber(num.valueAsNumber)}
				>
					<NumberInput.Label htmlFor="inputNum">Input number</NumberInput.Label>
					<NumberInput.Input id="inputNum" />
					<NumberInput.Control>
						<NumberInput.IncrementTrigger>▲</NumberInput.IncrementTrigger>
						<NumberInput.DecrementTrigger>▼</NumberInput.DecrementTrigger>
					</NumberInput.Control>
				</NumberInput.Root>

				<RadioGroup.Root
					onValueChange={(mode) => mode.value === "Sats" ? setMode('sats') : setMode('fiat') }
					defaultValue="Sats"
				>
					<RadioGroup.Label htmlFor="inputRadio">Unit</RadioGroup.Label>
					<RadioGroup.Indicator />
					{unitChoices.map((unitChoice) => (
						<RadioGroup.Item id="inputRadio" key={unitChoice} value={unitChoice}>
							<RadioGroup.ItemText>{unitChoice}</RadioGroup.ItemText>
							<RadioGroup.ItemControl />
							<RadioGroup.ItemHiddenInput />
						</RadioGroup.Item>
					))}
				</RadioGroup.Root>
				
			</form>
			<div className={styles.converter__output}>
				{outputString}
			</div>
		</div>
	)
}

export default Converter;