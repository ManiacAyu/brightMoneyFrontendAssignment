import { createSlice } from "@reduxjs/toolkit";
import { data } from "../db/db";

const billsSlice = createSlice({
  name: "bills",
  initialState: data.bills,
  reducers: {
    addBill: (state, action) => {
      state.push(action.payload);
    },
    deleteBill: (state, action) => {
      console.log("Here i am");
      const index = state.findIndex((bill) => bill.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    updateBill: (state, action) => {
      const index = state.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) {
        console.log(state[index]);
        state[index] = { ...state[index], ...action.payload.values};
        console.log(state[index]);
      }

      console.log("Ayush " + action.payload.amount);
    },
  },
});

export const { addBill, deleteBill, updateBill } = billsSlice.actions;
export default billsSlice.reducer;
