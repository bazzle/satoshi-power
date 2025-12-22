import styles from "./Stats.module.scss";
import output from "./output.js";

export default function StatsBlock({ currencyObj }){

	const smallUnitOutput = () => {
		if (output({currencyObj}).satsSmallUnit === null){
			return false
		} else {
			return <span>{output({currencyObj}).satsSmallUnit}</span>
		}
	}
	
	output({currencyObj}).satsSmallUnit
	
	return (
		<p className={styles.stats}>
			<span>{output({currencyObj}).btcConv}</span>
			<span>{output({currencyObj}).satsMainUnit}</span>
			{smallUnitOutput()}
		</p>
	)

}