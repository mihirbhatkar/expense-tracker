import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { categories as data } from "../Data/categoriesData";
import Loader from "../Components/Loader";
import { useSelector } from "react-redux";
import TimeModal from "../Components/ExpensePage/TimeModal";
import CategoriesModal from "../Components/ExpensePage/CategoriesModal";
import WalletModal from "../Components/ExpensePage/WalletModal";
import PricesModal from "../Components/ExpensePage/PricesModal";
import SearchModal from "../Components/ExpensePage/SearchModal";
import {
    useGetRecentExpensesMutation,
    useSearchByNameMutation,
    useSearchExpensesMutation,
} from "../Slices/expensesApiSlice";
import EditExpenseModal from "../Components/ExpensePage/EditExpenseModal";
import { toast } from "react-toastify";
import { useMemo } from "react";

const ExpensePage = () => {
    const getDates = (startingDate) => {
        const currentDate = new Date();
        let targetMonth = currentDate.getMonth() - startingDate;
        let targetYear = currentDate.getFullYear();

        if (targetMonth < 0) {
            targetMonth += 12;
            targetYear -= 1;
        }
        // First date of the target month
        const firstDate = new Date(targetYear, targetMonth, 1);
        if (startingDate == 1) {
            // for sending data of previous month
            const nextMonthFirstDay = new Date(
                targetYear,
                targetMonth + 1 == 12 ? 0 : targetMonth + 1,
                1
            );
            const lastDayOfMonth = new Date(nextMonthFirstDay - 1);

            return {
                start: firstDate,
                end: lastDayOfMonth,
                type: startingDate,
            };
        }
        
        return { start: firstDate, end: currentDate, type: startingDate };
    };

    const { wallets } = useSelector((state) => state.wallets);
    let walletNames = {};
    for (let i = 0; i < wallets.length; i++) {
        walletNames[`${wallets[i]._id}`] = wallets[i].walletName;
    }
    const [walletList, setWalletList] = useState(wallets);

    const categoriesList = Object.keys(data);
    const [categories, setCategories] = useState(categoriesList);

    const [dateRange, setDateRange] = useState(getDates(0));

    const [priceRange, setPriceRange] = useState({
        lower: 0,
        upper: 10000, // !CHANGE THIS LATER IG?
    });

    const [results, setResults] = useState([]);
    const [resultHeading, setResultHeading] = useState(
        "Most Recent Expenses..."
    );

    const [getRecentExpenses, { isLoading }] = useGetRecentExpensesMutation();
    const [searchExpenses] = useSearchExpensesMutation();
    const [searchByName] = useSearchByNameMutation();

    useEffect(() => {
        document.title = "Expenses";
        return () => {
            document.title = "stackSense";
        };
    });

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const exp = await getRecentExpenses().unwrap();
                setResults(exp.recentExpenses);
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        };
        getExpenses();
    }, [wallets]);

    const searchName = async (name) => {
        const getExp = async () => {
            const exp = await searchByName({ description: name }).unwrap();
            setResults(exp);
        };
        getExp();
    };

    const searchResults = async () => {
        const res = await searchExpenses({
            time: dateRange,
            categories: categories,
            wallets: walletList,
            amount: priceRange,
        }).unwrap();
        setResults(res);
        setResultHeading("Results");
    };

    return (
        <>
            <div className="flex flex-col p-4 gap-4 items-center">
                <h1 className="text-3xl font-extrabold">Search Expenses.</h1>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-3xl">
                    {/* TIME PERIOD MODAL */}
                    <TimeModal
                        getDates={getDates}
                        setDateRange={setDateRange}
                        dateRange={dateRange}
                    />

                    {/* CATEGORIES MODAL */}
                    <CategoriesModal
                        categories={categories}
                        setCategories={setCategories}
                        categoriesList={categoriesList}
                    />

                    {/* WALLETS MODAL */}
                    <WalletModal
                        setWalletList={setWalletList}
                        walletList={walletList}
                        wallets={wallets}
                    />

                    {/* PRICES MODAL */}
                    <PricesModal
                        setPriceRange={setPriceRange}
                        priceRange={priceRange}
                    />
                </div>
                <div className="grid grid-cols-[3fr_1fr] w-full max-w-sm gap-2">
                    {/* GENERAL SEARCH BUTTON */}
                    <button onClick={searchResults} className="btn btn-primary">
                        Search
                    </button>

                    {/* SEARCH MODAL */}
                    <SearchModal searchName={searchName} />
                </div>

                <div className="flex flex-col text-center py-4 gap-2 rounded w-full max-w-2xl">
                    <hr className="max-w-xs w-full border-1 border-black rounded-xl self-center" />

                    <h1 className="text-xl md:text-lg font-extrabold mb-2 mt-2">
                        {" "}
                        {resultHeading}
                    </h1>
                    {isLoading ? (
                        <Loader />
                    ) : results.length === 0 ? (
                        <div className="flex flex-col items-center gap-4">
                            <img
                                src="./images/fail.png"
                                alt=""
                                className="w-32 h-32"
                            />
                            <span className="font-semibold opacity-50">
                                No expenses match your search
                            </span>
                        </div>
                    ) : (
                        results.map((item) => {
                            return (
                                <EditExpenseModal
                                    key={item._id}
                                    item={item}
                                    wallet={walletNames[`${item.walletId}`]}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};
export default ExpensePage;
