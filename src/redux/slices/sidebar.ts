import { createSlice } from "@reduxjs/toolkit";


const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isOpen: false
    },
    reducers : {
        toggleSidebar: (state, action) => {
            state.isOpen = action.payload
        }
    }
})

export const { toggleSidebar } =  sidebarSlice.actions;

const { reducer } = sidebarSlice;
export default reducer;