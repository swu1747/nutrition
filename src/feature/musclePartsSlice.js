import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    parts: ['abdominals',
        'adductors',
        'biceps',
        'calves',
        'chest',
        'forearms',
        'glutes',
        'hamstrings',
        'lower_back',
        'neck',
        'quadriceps',
        'triceps']
}

const muscleParts = createSlice({
    name: 'muscleParts',
    initialState: initialState,
    reducers: {}
})

export const muscles = (state) => {
    return state.muscleparts.parts
}
export default muscleParts.reducer