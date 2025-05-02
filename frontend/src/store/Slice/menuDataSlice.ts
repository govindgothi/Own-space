import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface menuDataObject {
    selectedId: any;
    top: number;
    left: number;
}

const initialState:menuDataObject = {
    selectedId:null,
    top:0,
    left:0
};


const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addClickPosition: (state, action: PayloadAction<menuDataObject>) => {
     state.selectedId = action.payload.selectedId;
    state.top = action.payload.top;
    state.left = action.payload.left;
    return state
    },
  },
});


export const { addClickPosition } = menuSlice.actions;
export default menuSlice.reducer;