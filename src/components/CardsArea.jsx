import { useState } from "react";
import BillCard from "./BillCard";
import AddBill from "./forms/AddBill";
import UpdateBill from "./forms/UpdateBill";
const CardsArea = ({ bills }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [billToEdit, setBillToEdit] = useState(null);
  return (
    <>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => (
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
