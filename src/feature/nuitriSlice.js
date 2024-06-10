import { createSlice } from "@reduxjs/toolkit";

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
    }
})


export default nuitri.reducer