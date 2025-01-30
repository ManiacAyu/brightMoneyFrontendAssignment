import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateBill } from "../../store/billsSlice";

const UpdateBill = ({ isOpen, onClose, billToEdit, setBillToEdit }) => {
  const dispatch = useDispatch();
  
  const validationSchema = Yup.object({
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    amount: Yup.string().required("Amount is required"),
    date: Yup.string().required("Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      description: billToEdit?.description || "",
      category: billToEdit?.category || "",
      amount: billToEdit?.amount || "",
      date: billToEdit?.date || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values.date);
      let temp = values.date.split("-").reverse();
      temp = temp.join("-");
      values.date = temp;
      console.log(values.date);

      dispatch(updateBill({ id: billToEdit.id, values: values }));
      setBillToEdit();
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center justify-center bg-gradient-to-b from-black/50 to-black/100"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Update Bill</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("category")}
            />
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm">{formik.errors.category}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("amount")}
            />
            {formik.touched.amount && formik.errors.amount && (
              <p className="text-red-500 text-sm">{formik.errors.amount}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="date"
              name="date"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("date")}
            />
            {formik.touched.date && formik.errors.date && (
              <p className="text-red-500 text-sm">{formik.errors.date}</p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="p-2 bg-blue-600 rounded-lg text-yellow-100"
            >
              Update Bill
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-red-500 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBill;
