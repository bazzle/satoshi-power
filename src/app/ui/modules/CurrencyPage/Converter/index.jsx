'use client';
import { useEffect, useState } from "react";
import styles from "./Converter.module.scss";

function Converter({convCurrency}){
	const [mode, setMode] = useState('sats');
	const [inputNumber, setInputNumber] = useState(1);
	const [outputNumber, setOutputNumber] = useState();
	const [outputString, setOutputString] = useState('');

	// Run on load and when input number changes
	useEffect(()=>{
		console.log(convCurrency);
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

	const handleNumberChange = (input)=>{
		const val = input.target.value;
		setInputNumber(val === "" ? "" : Number(val));
	}

	return(
		<div className={styles.converter}>
			<form className={styles.converter__form}>
				<div className={styles.converter__inputNumber}>
					<label htmlFor="inputNumber"></label>
					<input id="inputNumber" type="number" min="0" value={inputNumber} onChange={(e)=> handleNumberChange(e)} />
				</div>
				<div className={styles.converter__inputRadio}>
					<span>
						<input
							type="radio"
							name="conversion"
							id="satoshis"
							value="satoshis"
							defaultChecked
							onChange={()=>setMode('sats')}
						/>
						<label htmlFor="satoshis">Satoshi's</label>
					</span>
					<span>
						<input
							type="radio"
							name="conversion"
							id="fiatCurrency"
							value="fiatCurrency"
							onChange={()=>setMode('fiat')}
						/>
						<label htmlFor="fiatCurrency">{convCurrency.displayName}</label>
					</span>
				</div>
			</form>
			<div className={styles.converter__output}>
				{outputString}
			</div>
		</div>
	)
}

export default Converter;