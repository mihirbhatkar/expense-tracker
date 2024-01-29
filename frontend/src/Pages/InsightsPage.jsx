import { BiSolidChevronsRight, BiSolidChevronsLeft } from "react-icons/bi";
import YearlyInsights from "../Components/InsightsPage/YearlyInsights";
import MonthlyInsights from "../Components/InsightsPage/MonthlyInsights";
import { useEffect, useState } from "react";

const InsightsPage = () => {
	const [carouselCounter, setCarouselCounter] = useState(
		localStorage.getItem("carouselCounter")
			? JSON.parse(localStorage.getItem("carouselCounter"))
			: () => {
					localStorage.setItem("carouselCounter", 0);
					return 0;
			  }
	);

	const incrementCarousel = () => {
		const localCounter = JSON.parse(
			localStorage.getItem("carouselCounter")
		);
		localStorage.setItem("carouselCounter", localCounter + 1);
		setCarouselCounter(carouselCounter + 1);
	};

	const decrementCarousel = () => {
		const localCounter = JSON.parse(
			localStorage.getItem("carouselCounter")
		);
		localStorage.setItem("carouselCounter", localCounter - 1);
		setCarouselCounter(carouselCounter - 1);
	};

	let carouselName = "";
	switch (carouselCounter) {
		case 0:
			carouselName = "Monthly Insights";
			break;
		case 1:
			carouselName = "Yearly Insights";
			break;

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
					onClick={decrementCarousel}
					className={`p-4 btn ${carouselCounter === 0 && "disabled"}`}
					disabled={carouselCounter === 0}
				>
					<BiSolidChevronsLeft />
				</button>
				<span className="font-bold">{carouselName}</span>
				<button
					onClick={incrementCarousel}
					className="p-4 bg-base-200 btn"
				>
					<BiSolidChevronsRight />
				</button>
			</div>
       
			{carouselCounter == 0 && <MonthlyInsights />}
			{carouselCounter == 1 && <YearlyInsights />}
		</div>
	);
};
export default InsightsPage;
