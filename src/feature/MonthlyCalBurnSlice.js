import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getrangeddayscal } from "../clientapi";
import dayjs from "dayjs";
const initialState = {
    everydayCal: {

    }
}

const MonthlyCalburn = createSlice({
    name: 'MonthlyCalburn',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchMonthlycal.fulfilled, (state, action) => {
            const temp = {}
            action.payload.forEach((item) => {
                const date = dayjs(item.date)
                temp[date.format('MM-DD-YYYY')] = item.cal_toal
            })
            state.everydayCal = temp
        })
    }
})

export const fetchMonthlycal = createAsyncThunk('./fetchMonthlycal', async ({ start, end }) => {
    const res = await getrangeddayscal(start, end)
    return res.data
})
export const getdaycal = (state) => state.MonthlyCalBurn.everydayCal
export default MonthlyCalburn.reducer