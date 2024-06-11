import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nuitrisearch } from "../clientapi";

const initialState = {
    status: 'idle',
    food: '',
    searchRes: [],
}

const nuitri = createSlice({
    name: 'nuitrition',
    initialState: initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setFood: (state, action) => {
            state.food = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNuitriList.fulfilled, (state, action) => {
            state.status = 'success'
            state.searchRes = action.payload
        })
    }
})

export const fetchNuitriList = createAsyncThunk('/nuitrilist', async (_, { getState }) => {
    const param = { search_expression: getState().nuitritionSearch.food }
    const res = await nuitrisearch(param)
    return Array.isArray(res.data) ? res.data : []
})

export const getStatus = (state) => state.nuitritionSearch.status
export const getfood = (state) => state.nuitritionSearch.food
export const getsearchRes = (state) => state.nuitritionSearch.searchRes

export const { setStatus, setFood } = nuitri.actions
export default nuitri.reducer