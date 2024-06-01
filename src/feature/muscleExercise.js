import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    part: '',
    difficulty: 'all',
    type: 'all',
    page: 0,
    exerciseList: []
}

const muscleExercise = createSlice({
    name: 'muscleExercies',
    initialState: initialState,
    reducers: {
        setPart: (state, action) => {
            state.page = 0
            state.part = action.payload
        },
        setDifficulty: (state, action) => {
            state.page = 0
            state.difficulty = action.payload
        },
        setType: (state, action) => {
            state.page = 0
            state.type = action.payload
        },
        setPage: (state) => {
            state.page++
        }

    },
    extraReducers(builder) {

    }
})

export const updateList = createAsyncThunk('/updateexerciselist', async ({ part, difficulty, type, page }) => {
    difficulty = difficulty === 'all' ? '' : difficulty
    type = type === 'all' ? '' : type
})
export default muscleExercise.reducer