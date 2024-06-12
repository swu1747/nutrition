import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNuitrition } from "../clientapi";

const initialState = {
    food_name: '',
    food: [],
    
}

const foodDetail = createSlice({
    name: 'foodDetail',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNutri.fulfilled, (state, action) => {
            state.food_name = action.payload.food_name
            state.food = action.payload.servings.serving
        })
    }

})

export const fetchNutri = createAsyncThunk('/fetchNutri', async (food_id) => {
    const res = await getNuitrition({ food_id: food_id })
    return res.data
})

export const getFoodName = (state) => state.foodDetail.food_name
export const getFood = (state) => state.foodDetail.food
export default foodDetail.reducer