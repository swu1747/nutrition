import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { getsdnuitri, getrangedaynuitri } from "../clientapi";
const initialState = {
    daynutri: {
        fat: 0,
        saturated_fat: 0,
        trans_fat: 0,
        monounsaturated_fat: 0,
        polyunsaturated_fat: 0,
        protein: 0,
        calories: 0,
        carbohydrate: 0,
        cholesterol: 0,
        sodium: 0,
        potassium: 0,
        fiber: 0,
        sugar: 0,
        vitamin_a: 0,
        vitamin_c: 0,
        calcium: 0,
        iron: 0
    },
    log: [],
    monthlydayCal: {}
}

const everydaynutri = createSlice({
    name: 'dayNuitri',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchdaynutri.fulfilled, (state, action) => {
            state.daynutri = action.payload[0]
            state.log = action.payload[1]
        }).addCase(fetchRangeDnutri.fulfilled, (state, action) => {
            state.monthlydayCal = action.payload
        })
    }
})
export const fetchRangeDnutri = createAsyncThunk('/fetchRangeDnutri', async ({ start, end }) => {
    const temp = {}
    const res = await getrangedaynuitri(start, end)
    res.data.forEach((item) => {
        const date = dayjs(item.time).format('MM-DD-YYYY')
        if (!temp[date]) {
            temp[date] = +item.calories
        } else {
            temp[date] += +item.calories
        }
    })
    return temp
})
export const fetchdaynutri = createAsyncThunk('/fetchdaynutri', async (date) => {
    const temp = {
        fat: 0,
        saturated_fat: 0,
        trans_fat: 0,
        monounsaturated_fat: 0,
        polyunsaturated_fat: 0,
        protein: 0,
        calories: 0,
        carbohydrate: 0,
        cholesterol: 0,
        sodium: 0,
        potassium: 0,
        fiber: 0,
        sugar: 0,
        vitamin_a: 0,
        vitamin_c: 0,
        calcium: 0,
        iron: 0
    }
    const response = await getsdnuitri(date)
    response.data.forEach((item) => {
        for (const x in item) {
            temp[x] += +item[x]
        }
    })
    for (const x in temp) {
        if (!isNaN(temp[x])) {
            temp[x] = +temp[x].toFixed(2)
        }
    }
    return [temp, response.data]
})
export default everydaynutri.reducer
export const getdaynutri = (state) => state.daynutri.daynutri
export const getdaynutrilog = (state) => state.daynutri.log
export const getmonthlynutri=(state)=>state.daynutri.monthlydayCal