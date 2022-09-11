import { createSlice } from '@reduxjs/toolkit';

const invoices = createSlice({
  name: 'invoices',
  initialState: [
    {
      id: 0,
      username: '',
      img: '',
      productCount: 0,
      price: 0,
      status: '',
    },
  ],
  reducers: {
    getInvoicesSlice: (state, action) => {
      state = action.payload;
      return state;
    },
    deleteInvoiceSlice: (state,action) =>{
      state = state.filter(i=>i.id !== action.payload)
      return state;
    }
  },
});

export const { getInvoicesSlice, deleteInvoiceSlice} = invoices.actions;
export default invoices.reducer;
