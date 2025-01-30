import { useState, useEffect } from "react";
import CardsArea from "../components/CardsArea";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

const Body = () => {
  const bills = useSelector((state) => state.bills);
  const [billsTodisplay, setBillsTodisplay] = useState(bills);
  const amount = useSelector((state) => state.monthlyBudget);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([
    "All Categories",
    ...bills.reduce((prev, bill) => {
      prev.add(bill.category);
      return prev;
    }, new Set()),
  ]);

  useEffect(() => {
    setBillsTodisplay(bills);
  }, [bills]);
  const changeHandler = (e) => {
    setCategory(e.target.value);
    setBillsTodisplay(
      bills.filter(
        (bill) =>
          bill.category === e.target.value ||
          e.target.value === "All Categories"
      )
    );
  };

  return (
    <div className="font-sans md:font-serif py-20 min-h-screen bg-gradient-to-b from-[#F9B5D0] to-[#A2D9F3]">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Budget: ₹{amount}</h1>
        </div>

        <div className="relative">
          <select
            onChange={changeHandler}
            className="block w-full p-3 pr-10 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <CardsArea bills={billsTodisplay} />
    </div>
  );
};

export default Body;
