import { configureStore } from "@reduxjs/toolkit";
import textReducer from "./textSlice.js";

export const store = configureStore({
    reducer: {
        generateText: textReducer,
    },
})