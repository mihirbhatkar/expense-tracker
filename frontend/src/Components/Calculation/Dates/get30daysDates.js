const get30daysDates = () => {
	const currentDate = new Date();
	const thirtyDaysAgo = new Date(currentDate);

	// Subtract 30 days (30 * 24 * 60 * 60 * 1000 milliseconds) from the current date
	thirtyDaysAgo.setTime(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

	return {
		start: thirtyDaysAgo,
		end: currentDate,
	};
};
export default get30daysDates;
