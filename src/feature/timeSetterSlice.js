import dayjs from "dayjs";
import { createSlice } from "@reduxjs/toolkit";
const time = dayjs()
const initialState = {
    start: time,
    end: time
}

const timeSetter = createSlice({
    name: 'timesetter',
    initialState: initialState,
    reducers: {
        setStart: (state, action) => {
            state.start = action.payload
        },
        setEnd: (state, action) => {
            state.end = action.payload
        }
    }
})
export const start = (state) => {
    return state.settime.start
}
export const end = (state) => {
    return state.settime.end
}
export const { setStart, setEnd } = timeSetter.actions
export default timeSetter.reducer