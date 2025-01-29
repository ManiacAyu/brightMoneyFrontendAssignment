import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteBill, updateBill } from "../store/billsSlice";
import { decrAmount } from "../store/monthlyBudget";

const BillCard = ({ bill, onUpdate }) => {
  const dispatch = useDispatch();
  const budget = useSelector((state) => state.monthlyBudget);
  const editHandler = () => {
    onUpdate(bill);
  };
  const deleteHandler = () => {
    dispatch(deleteBill(bill.id));
  };

  const payBillHandler = () => {
    const zx = parseInt(bill.amount);
    if (zx > budget) {
    } else {
      dispatch(decrAmount(zx));
      deleteHandler();
    }
  };
  console.log(bill)
  return (
    <div className="relative w-80 bg-white shadow-lg rounded-2xl p-4">
      <div className="absolute top-3 right-3 flex gap-6">
        <EditIcon
          className="text-gray-600 cursor-pointer hover:text-blue-500"
          size={20}
          onClick={editHandler}
        />
        <DeleteIcon
          className="text-gray-600 cursor-pointer hover:text-red-500"
          size={20}
          onClick={deleteHandler}
        />
      </div>

      <div className="text-center mt-6">
        <h3 className="text-lg font-semibold text-gray-800">
          {bill.description}
        </h3>
        <p className="text-sm text-gray-500">{bill.category}</p>
        <p className="text-xl font-bold text-gray-900 mt-2">₹{bill.amount}</p>
        <p className="text-sm text-gray-500 mt-1">Date: {bill.date}</p>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={payBillHandler}
        >
          Pay Bill
        </button>
        {bill.should_be_paid && (
          <button
            className="ml-5 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={payBillHandler}
          >
            Should Be Paid
          </button>
        )}
      </div>
    </div>
  );
};

export default BillCard;
