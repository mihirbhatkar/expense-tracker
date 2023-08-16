import { BiSolidChevronsRight, BiSolidChevronsLeft } from "react-icons/bi";
import MonthExpenses from "../Components/InsightsPage/MonthExpenses";
import CategoricalDistro from "../Components/InsightsPage/CategoricalDistro";
import { useState } from "react";

const InsightsPage = () => {
  const [carouselCounter, setCarouselCounter] = useState(0);
  let carouselName = "";
  switch (carouselCounter) {
    case 0:
      carouselName = "Yearly Expenses";
      break;

    case 1:
      carouselName = "Categorical Distribution";

    default:
      break;
  }

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
          <BiSolidChevronsLeft />{" "}
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
      {carouselCounter == 0 && <MonthExpenses />}
      {carouselCounter == 1 && <CategoricalDistro />}
    </div>
  );
};
export default InsightsPage;
