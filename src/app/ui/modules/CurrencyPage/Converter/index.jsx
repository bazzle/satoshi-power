'use client';
import { useEffect, useState } from "react";
import styles from "./Converter.module.scss";
import { NumberInput } from '@ark-ui/react/number-input'
import { RadioGroup } from '@ark-ui/react/radio-group'


function Converter({convCurrency}){
	const [mode, setMode] = useState('sats');
	const [inputNumber, setInputNumber] = useState(1);
	const [outputNumber, setOutputNumber] = useState();
	const [outputString, setOutputString] = useState('');

	// console.log(NumberInput)

	// Run on load and when input number changes
	useEffect(()=>{
		console.log(mode);
		let rawNum
		let outputValue
		let outputString
		let currencyString = convCurrency.displayName
		if(mode === 'sats'){
			rawNum = inputNumber * convCurrency.satPrice;
			outputValue = Number(Number(rawNum).toFixed(2));
			setOutputNumber(outputValue);
			outputString = (
				<p>{inputNumber} Satoshi's = {currencyString} {outputValue}</p>
			)
		} else if(mode === 'fiat') {
			rawNum = inputNumber / convCurrency.satPrice;
			outputValue = Number(Number(rawNum).toFixed(2));
			setOutputNumber(outputValue);
			outputString = (
				<p>{inputNumber} {currencyString} = {outputValue} Satoshi's</p>
			)
		}
		setOutputString(outputString);
	},[inputNumber, mode])

	const unitChoices = ['Sats',convCurrency.displayName];

	return(
		<div className={styles.converter}>
			<form className={styles.converter__form}>
				<div className={styles.converter__inputNumber}>
					<NumberInput.Root
						min={0}
						defaultValue={1}
						onValueChange={(num) => setInputNumber(num.valueAsNumber)}
					>
						<NumberInput.Label>Input number</NumberInput.Label>
						<NumberInput.Input />
						<NumberInput.Control>
							<NumberInput.IncrementTrigger>▲</NumberInput.IncrementTrigger>
							<NumberInput.DecrementTrigger>▼</NumberInput.DecrementTrigger>
						</NumberInput.Control>
					</NumberInput.Root>

				</div>
				<div className={styles.converter__inputRadio}>

				<RadioGroup.Root
					onValueChange={(mode) => mode.value === "Sats" ? setMode('sats') : setMode('fiat') }
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

				</div>
			</form>
			<div className={styles.converter__output}>
				{outputString}
			</div>
		</div>
	)
}

export default Converter;