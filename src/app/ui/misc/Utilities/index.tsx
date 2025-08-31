const Utilities = {
    getPercentage : (unitPrice:number) => {
        return Math.floor(unitPrice * 100);
    },
	removeLastWord : (str:string) => {
		return str.trim().split(" ").slice(0, -1).join(" ");
	}
}

export default Utilities;