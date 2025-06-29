import { createSlice } from "@reduxjs/toolkit"


const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        loading: false,
        expenses: [],
        category: "",
        markAsDone: "",
        singleExpense: null
    },
    reducers: {
        // actions
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setMarkAsDone: (state, action) => {
            state.markAsDone = action.payload;
        },
        setSingleExpense: (state, action) => {
            state.singleExpense = action.payload;
        }
    }
});
export const {
    setLoading,
    setExpenses,
    setCategory,
    setMarkAsDone,
    setSingleExpense
} = expenseSlice.actions;

export default expenseSlice.reducer;