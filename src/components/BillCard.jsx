import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteBill, updateBill } from "../store/billsSlice";
import { decrAmount } from "../store/monthlyBudget";
import { toast, Bounce } from "react-toastify";

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
      toast.error("Insufficient Balance!!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      dispatch(decrAmount(zx));
      deleteHandler();
    }
  };
  console.log(bill);
  return (
    <div className="ml-20 relative w-80 bg-white shadow-lg rounded-2xl p-4">
      <div className="absolute top-6 right-6 flex gap-6">
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

      <div className="text-center mt-13">
        <h3 className="text-4xl font-semibold text-gray-800">
          {bill.description}
        </h3>
        <p className="mt-2 text-m text-gray-500">{bill.category}</p>
        <p className="mt-2 text-xl font-bold text-gray-900 mt-2">₹{bill.amount}</p>
        <p className="mt-2 text-sm text-gray-500 mt-1">Date: {bill.date}</p>
      </div>

      <div className="mt-4 mb-4 flex justify-center mt-4">
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
