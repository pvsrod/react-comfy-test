export const formatPrice = (number) => {
	const newNumber = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(number / 100);
	return newNumber;
};

export const getUniqueValues = (data, type) => {
	let unique = data.map((item) => item[type]);
	//the colors are an array so we do it a little different in that case
	if (type === "colors") {
		unique = unique.flat(); //we transform the array of arrays into a normal array (it eliminates the inside arrays)
		// e.g. [[1,2],[3,4],[5,6]]=>[1,2,3,4,5,6]
	}
	return ["all", ...new Set(unique)]; //we just add the 'all' option manually to the array
};
