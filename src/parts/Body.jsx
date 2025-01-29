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
    <div>
      <h1>Budget: ${amount}</h1>
      <select onChange={changeHandler}>
        {categories.map((cat) => (
          <option value={cat} key={cat}>
            {cat}
          </option>
        ))}
      </select>
      
      <CardsArea bills={billsTodisplay} />
    </div>
  );
};

export default Body;
