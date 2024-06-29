import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getrangeddayscal, getsingledaycaldetail, getsingledaycal } from "../clientapi";
import dayjs from "dayjs";
const initialState = {
    everydayCal: {},
    totalcal: 0,
    caldetail: new Array(24).fill(0),
    detail: []
}

const MonthlyCalburn = createSlice({
    name: 'MonthlyCalburn',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMonthlycal.fulfilled, (state, action) => {
            const temp = {}
            action.payload.forEach((item) => {
                const date = dayjs(item.date)
                temp[date.format('MM-DD-YYYY')] = item.cal_toal
            })
            state.everydayCal = temp
        }).addCase(fetchcaldetail.fulfilled, (state, action) => {
            const { detail, calories, cal } = action.payload
            state.totalcal = calories
            state.detail = detail
            state.caldetail = cal
        })

    }
})

export const fetchMonthlycal = createAsyncThunk('./fetchMonthlycal', async ({ start, end }) => {
    const res = await getrangeddayscal(start, end)
    return res.data
})
export const fetchcaldetail = createAsyncThunk('./fetchcaldetail', async (date) => {
    const cal = new Array(24).fill(0)
    const res = await Promise.all([getsingledaycaldetail(date), getsingledaycal(date)])
    res[0].data.forEach((item) => {
        const calpermin = +item.calpermin
        const start = dayjs(item.starttime)
        const end = dayjs(item.endtime)
        let startH = start.hour()
        let endH = end.hour()
        let startM = start.minute()
        let endM = end.minute()
        if (startH === endH) {
            cal[startH] += (endM - startM) * calpermin
        } else {
            cal[startH] += (60 - startM) * calpermin
            startH++
            cal[endH] += endM * calpermin
            while (startH < endH) {
                cal[startH] += 60 * calpermin
                startH++
            }
        }
    })
    const calories = res[1].data[0] ? +res[1].data[0].cal_toal : 0
    return { detail: res[0].data, calories, cal }
})
export const gettotalcal = (state) => state.MonthlyCalBurn.totalcal
export const getcaldetail = (state) => state.MonthlyCalBurn.caldetail
export const getdetail = (state) => state.MonthlyCalBurn.detail

export const getdaycal = (state) => state.MonthlyCalBurn.everydayCal
export default MonthlyCalburn.reducer