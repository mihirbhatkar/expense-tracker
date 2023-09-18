import { BiSolidChevronsRight, BiSolidChevronsLeft } from "react-icons/bi";
import YearlyInsights from "../Components/InsightsPage/YearlyInsights";
import MonthlyInsights from "../Components/InsightsPage/MonthlyInsights";
import { useEffect, useState } from "react";

const InsightsPage = () => {
	const [carouselCounter, setCarouselCounter] = useState(0);
	let carouselName = "";
	switch (carouselCounter) {
		case 0:
			carouselName = "Yearly Insights";
			break;

		case 1:
			carouselName = "Monthly Insights";

		default:
			break;
	}

	useEffect(() => {
		document.title = "Insights";
		return () => {
			document.title = "stackSense";
		};
	});

	return (
		<div className="flex flex-col items-center gap-8 p-4">
			<div className="space-x-4">
				<button
					onClick={() => {
						setCarouselCounter(carouselCounter - 1);
					}}
					className={`p-4 btn ${carouselCounter === 0 && "disabled"}`}
					disabled={carouselCounter === 0}
				>
					<BiSolidChevronsLeft />
				</button>
				<span className="font-bold">{carouselName}</span>
				<button
					onClick={() => {
						setCarouselCounter(carouselCounter + 1);
					}}
					className="p-4 bg-base-200 btn"
				>
					<BiSolidChevronsRight />
				</button>
			</div>
			{carouselCounter == 0 && <YearlyInsights />}
			{carouselCounter == 1 && <MonthlyInsights />}
		</div>
	);
};
export default InsightsPage;
