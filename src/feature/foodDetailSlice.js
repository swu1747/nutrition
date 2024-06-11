import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNuitrition } from "../clientapi";

const initialState = {
    food_name: '',
    food: []
}

const foodDetail = createSlice({
    name: 'foodDetail',
    initialState: initialState,
    reducers: {

    }
    

})
export const fetchNutri1 = createAsyncThunk('/fetchNutri', async (food_id) => {
    const res = await getNuitrition({ food_id: food_id })
    console.log('...', res.data)
    return res.data
})

export const getFoodName = (state) => state.foodDetail.food_name
export const getFood = (state) => state.foodDetail.food
export default foodDetail.reducer