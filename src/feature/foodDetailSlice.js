import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNuitrition } from "../clientapi";

const initialState = {
    food_name: '',
    food: [],
    modal: false
}

const foodDetail = createSlice({
    name: 'foodDetail',
    initialState: initialState,
    reducers: {
        changeFoodModal: (state) => {
            state.modal = !state.modal
        }
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
export const { changeFoodModal } = foodDetail.actions
export const getFoodName = (state) => state.foodDetail.food_name
export const getFood = (state) => state.foodDetail.food
export const getServing = (state, size) => {
    if (!state.foodDetail.food.length) {
        return ''
    }
    return size !== '' ? state.foodDetail.food.find((item) => item.serving_description === size) : state.foodDetail.food[0]
}
export const getFoodModal = (state) => state.foodDetail.modal
export default foodDetail.reducer