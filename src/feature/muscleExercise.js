import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    part: '',
    difficulty: '',
    type: '',
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
        builder.addCase(updateList.fulfilled, () => {

        })
    }
})

export const updateList = createAsyncThunk('/updateExerciseList', async ({ part, difficulty, type, page }) => {

})
export default muscleExercise.reducer