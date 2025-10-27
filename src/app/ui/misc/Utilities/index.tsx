import slugify from "slugify";

const Utilities = {
    getPercentage : (unitPrice:number) => {
        return Math.round(unitPrice * 100);
    },
	removeLastWord : (str:string) => {
		return str.trim().split(" ").slice(0, -1).join(" ");
	},
	slugify : (str:string) => {
		return slugify(str, { lower: true, strict: true });
	}
}

export default Utilities;