import { createSlice } from "@reduxjs/toolkit";


const inititalState = {
    status: 'idle'
}

const SignInState = createSlice({
    name: 'SignInState',
    InititalState: inititalState,
    reducers: {
        changeState: (state, action) => {
            state.status = action.payload
        }
    }
})