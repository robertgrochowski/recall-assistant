import {createSlice} from "@reduxjs/toolkit";
import {BUCKET_URL} from "../common/Constants";

const initialState = {
    notions: [],
    currentItemIndex: 0,
    currentItem: null
};

const addNotionsImages = (notion) => {
    let urls = [];
    for(let i = 0; i < notion.pictures; i++){
        urls.push(BUCKET_URL+"/"+notion.uuid+"/"+i+".png");
    }
    notion.images = urls;
    return notion;
}

export const notionsSlice = createSlice({
    name: 'notions',
    initialState,
    reducers: {
        setNotions: (state, action) => {
            state.notions = action.payload.map(addNotionsImages);
            state.currentItem = action.payload[0]
            state.currentItemIndex = 0;
            console.log("set store")
        },
        nextNotion: (state) => {
            console.log("next store")
            state.currentItemIndex += 1;
            state.currentItem = state.notions[state.currentItemIndex];
        },
        resetNotions: (state) => {
            state.notions = [];
            state.currentItemIndex = 0;
            state.currentItem = null;
        }
    }
});

export const { setNotions, nextNotion, resetNotions } = notionsSlice.actions;
export const selectNotions = (state) => state.notions;
export default notionsSlice.reducer;