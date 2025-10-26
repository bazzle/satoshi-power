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
		let rawNum
		let outputValue
		let outputString
		let currencyString = convCurrency.displayName
		if(mode === 'sats'){
			rawNum = inputNumber * convCurrency.satPrice;
			outputValue = Number(Number(rawNum).toFixed(2));
			outputString = (
				<p>{inputNumber.toLocaleString()} Satoshi's = {currencyString} {outputValue}</p>
			)
		} else if(mode === 'fiat') {
			rawNum = inputNumber / convCurrency.satPrice;
			outputValue = Number(Number(rawNum).toFixed(2));
			outputString = (
				<p>{inputNumber} {currencyString} = {inputNumber.toLocaleString()} Satoshi's</p>
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
					min={0}
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