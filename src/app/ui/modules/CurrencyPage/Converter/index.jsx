'use client';

import styles from "./Converter.module.scss"

function Converter({convCurrency}){
	console.log(convCurrency);
	return(
		<div className={styles.converter}>
			<form className={styles.converter__form}>
				<div className={styles.converter__inputNumber}>
					<label htmlFor="inputNumber"></label>
					<input id="inputNumber" type="number" defaultValue="1" />
				</div>
				<fieldset className={styles.converter__inputRadio}>
					<legend>Check conversion</legend>
					<span>
						<input type="radio" name="conversion" id="satoshis" value="satoshis" defaultChecked />
						<label htmlFor="satoshis">Satoshi's</label>
					</span>
					<span>
						<input type="radio" name="conversion" id="fiatCurrency" value="fiatCurrency" />
						<label htmlFor="fiatCurrency">{convCurrency.displayName}</label>
					</span>
				</fieldset>
			</form>
			<div className={styles.converter__output}>
				<p>1 Satoshi = 4 Czech Coruna</p>
			</div>
		</div>
	)
}

export default Converter;