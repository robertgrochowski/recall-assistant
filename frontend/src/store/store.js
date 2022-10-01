import {configureStore} from "@reduxjs/toolkit";
import notionsReducer from '../store/notionSlices'

export const store = configureStore({
    reducer: {
        notions: notionsReducer,
    },
});