import { useState, useEffect } from "react";
import BillCard from "./BillCard";
import AddBill from "./forms/AddBill";
import UpdateBill from "./forms/UpdateBill";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const CardsArea = ({ bills }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [billToEdit, setBillToEdit] = useState(null);
  const [updatedBills, setUpdatedBills] = useState([]);
  const amount = useSelector((state) => state.monthlyBudget);

  const addHandler = () => {
    setAddModalOpen(true);
    setBillToEdit(null);
  };

  useEffect(() => {
    let updated_bills = [...bills];
    updated_bills.sort((a, b) => parseInt(b.amount) - parseInt(a.amount));
    let budget = amount;
    updated_bills = updated_bills.map((bill) => {
      if (bill.amount <= budget) {
        budget -= bill.amount;
        return { ...bill, should_be_paid: true };
      } else {
        return { ...bill, should_be_paid: false };
      }
    });
    setUpdatedBills(updated_bills);
  }, [bills]);
  return (
    <>
      <div className="flex items-center justify-end p-4">
        <button
          onClick={addHandler}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
        >
          <AddIcon className="mr-2" />
          <span>Add</span>
        </button>
      </div>
      <div className="p-6 ">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper"
        >
          {updatedBills.map((bill) => (
            <SwiperSlide key={bill.id}>
              <BillCard
                bill={bill}
                onUpdate={(bill) => {
                  setBillToEdit(bill);
                  setEditModalOpen(true);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination !relative !mt-10 !flex !justify-center"></div>
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
