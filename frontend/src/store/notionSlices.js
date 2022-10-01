import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    notions: [],
    currentItemIndex: 0,
    currentItem: null,
};

export const notionsSlice = createSlice({
    name: 'notions',
    initialState,
    reducers: {
        setNotions: (state, action) => {
            state.notions = action.payload;
            state.currentItem = action.payload[0]
            state.currentItemIndex = 0
        },
        nextNotion: (state) => {
            console.log("old state:"+state.currentItemIndex)
            if(state.currentItemIndex + 1 === state.notions.length) {
                state.currentItemIndex = 0;
            }
            else {
                state.currentItemIndex += 1;
            }
            state.currentItem = state.notions[state.currentItemIndex]
        }
    }
});

export const { setNotions, nextNotion } = notionsSlice.actions;
export const selectNotion = (state) => state.notions.currentItem;
export default notionsSlice.reducer;