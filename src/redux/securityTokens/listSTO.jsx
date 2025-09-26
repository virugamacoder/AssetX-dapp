import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedObjectForListSTO: {},
};

const listSTOSlice = createSlice({
    name: "listSTO",
    initialState,
    reducers: {
        setSelectedObjectForListSTO: (state, action) => {
            state.selectedObjectForListSTO = action.payload;
        }
    }
})

export const {
    setSelectedObjectForListSTO,
} = listSTOSlice.actions;

export default listSTOSlice.reducer;