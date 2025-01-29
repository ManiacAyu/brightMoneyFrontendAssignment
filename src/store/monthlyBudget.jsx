import { createSlice } from '@reduxjs/toolkit';

const monthlyBudget = createSlice({
    name: 'budget',
    initialState: 20000,
    reducers: {
        decrAmount: (state, action) => {
            console.log(typeof state)
            return state - action.payload;
          
        },
    },
});

export const { decrAmount } = monthlyBudget.actions;
export default monthlyBudget.reducer;

