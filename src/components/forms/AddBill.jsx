import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addBill } from "../../store/billsSlice";


const AddBill = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    amount: Yup.number().positive().required("Amount is required"),
    date: Yup.string().required("Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      category: "",
      amount: "",
      date: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addBill({ id: Date.now(), ...values }));
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Bill</h2>
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
            <button type="submit" className="bg-green-600 text-white">
              Add Bill
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBill;
