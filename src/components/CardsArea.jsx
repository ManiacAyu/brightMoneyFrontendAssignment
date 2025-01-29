import { useState,useEffect } from "react";
import BillCard from "./BillCard";
import AddBill from "./forms/AddBill";
import UpdateBill from "./forms/UpdateBill";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
const CardsArea = ({ bills }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [billToEdit, setBillToEdit] = useState(null);
  const [updatedBills, setUpdatedBills] = useState([]);
  const amount = useSelector((state)=> state.monthlyBudget);

  const addHandler = () => {
    setAddModalOpen(true);
    setBillToEdit(null);
  };

  useEffect(() => {
    let updated_bills = [...bills];
    updated_bills.sort((a, b) => parseInt(b.amount) - parseInt(a.amount));
    let budget = amount;
    updated_bills = updated_bills.map(bill => {
      if(bill.amount <= budget){
        budget -= bill.amount;
        return {...bill, should_be_paid: true};
      }
      else{
        return {...bill, should_be_paid: false};
      }
    })
    setUpdatedBills(updated_bills);
  }, [bills]);
  return (
    <>
      <div className="ml-50">
        <span>Add</span>
        <AddIcon onClick={addHandler} />
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {updatedBills.map((bill) => (
          <BillCard
            key={bill.id}
            bill={bill}
            onUpdate={(bill) => {
              setBillToEdit(bill);
              setEditModalOpen(true);
            }}
            
          />
        ))}
      </div>
      <AddBill isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
      <UpdateBill
        billToEdit={billToEdit}
        setBillToEdit={() => setBillToEdit(null)}
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
      />
    </>
  );
};

export default CardsArea;
