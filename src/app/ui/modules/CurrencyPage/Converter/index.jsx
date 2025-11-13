'use client';
import { useEffect, useState } from "react";
import styles from "./styles/Converter.module.scss";
import { NumberInput } from '@ark-ui/react/number-input'
import { RadioGroup } from '@ark-ui/react/radio-group'
import Icons from '@/app/ui/misc/Icons'


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
		let	outputLocalValue
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
			num = checkNum(num)
			const label = num === 1 ? 'Satoshi' : "Satoshi's"
			return `${num.toLocaleString()} ${label} `;
		}
		const localiseCurrencyOutput = (price) => {
			return new Intl.NumberFormat(convCurrency.locale).format(price);
		}

		if(mode === 'sats'){
			OutputRawNum = inputNumber * satPrice;
			outputValue = Number(Number(OutputRawNum).toFixed(0));
			outputValue = checkNum(outputValue);
			outputLocalValue = localiseCurrencyOutput(outputValue);
			const mainUnitValue = (Math.floor(outputValue) / 100).toFixed(2);
			const showMainUnit = (!convCurrency.mainUnitKilled) && convCurrency.subUnits === 100 && mainUnitValue > 1
			outputString = (
				<p>{satoshiLabelString(inputNumber)} = {outputValue} {currencyString} {showMainUnit && `/ ${convCurrency.symbol}${mainUnitValue}`}</p>
			)
		} else if(mode === 'fiat') {
			OutputRawNum = inputNumber / satPrice;
			outputValue = Number(Number(OutputRawNum).toFixed(2));
			outputString = (
				<p>{checkNum(inputNumber)} {currencyString} = {satoshiLabelString(outputValue)}</p>
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
						<NumberInput.IncrementTrigger>
							{Icons.arrow}
						</NumberInput.IncrementTrigger>
						<NumberInput.DecrementTrigger>
							{Icons.arrow}
						</NumberInput.DecrementTrigger>
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