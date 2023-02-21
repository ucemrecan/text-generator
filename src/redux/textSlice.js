import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    text: '',
    paras: 4,
    format: 'text',
    isLoading: false,
    error: null
}

export const getTextAsync = createAsyncThunk(
    'textSlice/getTextAsync',
    async ({paras, format}) => {
      const response = await axios.get(`https://baconipsum.com/api/?type=all-meat&paras=${paras}&format=${format}`);
      return response.data;
    } 
  );

export const textSlice = createSlice({
    name:'generateText',
    initialState,
    reducers: {
        setParas: (state, action) => {
            state.paras = action.payload;
    },
        setFormat: (state,action) => {
            if (action.payload === 'yes') {
                state.format = 'html';
            } else {
                state.format = 'text';
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTextAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTextAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.text = action.payload;
        });
        builder.addCase(getTextAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error =  action.error.message;
        });
    },

})

export const { setParas, setFormat } = textSlice.actions;

export default textSlice.reducer;