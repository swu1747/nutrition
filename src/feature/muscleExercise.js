import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getExercise } from "../clientapi";
const initialState = {
    muscle: '',
    difficulty: '',
    type: '',
    offset: 0,
    exerciseList: []
}

const muscleExercise = createSlice({
    name: 'muscleExercies',
    initialState: initialState,
    reducers: {
        setmuscle: (state, action) => {
            state.offset = 0
            state.muscle = action.payload
        },
        setDifficulty: (state, action) => {
            state.offset = 0
            state.difficulty = action.payload
        },
        setType: (state, action) => {
            state.offset = 0
            state.type = action.payload
        },
        setPage: (state) => {
            state.offset++
        }

    },
    extraReducers(builder) {
        builder.addCase(updateExerciseList.fulfilled, (state, action) => {
            if (state.offset === 0) {
                state.exerciseList = action.payload
            } else {
                state.exerciseList = [...state.exerciseList, ...action.payload]
            }
        })
    }
})

export const updateExerciseList = createAsyncThunk('/updateExerciseList', async ({ muscle, difficulty, type, offset }) => {
    try {
        const res = await getExercise({ muscle, difficulty, type, offset })
        return res.data
    } catch (error) {
        throw error
    }
})
export const fetchExerciseList = (state) => {
    return state.muscleExercise.exerciseList
}
export default muscleExercise.reducer