import { configureStore } from "@reduxjs/toolkit";
import bills from "./billsSlice";
import monthlyBudget from "./monthlyBudget"

const store = configureStore({
  reducer: {
    bills: bills,
    monthlyBudget: monthlyBudget,  
  },
});

export default store;
