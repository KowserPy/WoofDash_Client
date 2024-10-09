import numeral from "numeral";

const formatNumber = (num) => {
	let formatted = numeral(num).format("0.[0]a");
	return formatted.replace(/\.0/, ""); // Remove unnecessary .0
};

export default formatNumber;
