import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getsdnuitri } from "../clientapi";
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
    log: []
}

const everydaynutri = createSlice({
    name: 'dayNuitri',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => [
        builder.addCase(fetchdaynutri.fulfilled, (state, action) => {
            state.daynutri = action.payload[0]
            state.log = action.payload[1]
        })
    ]
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