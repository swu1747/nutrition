import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getExercise } from "../clientapi";
const initialState = {
    status: 'idle',
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
            console.log('before', state.offset)
            state.offset += 1
            console.log('after', state.offset)

        }

    },
    extraReducers(builder) {
        builder.addCase(updateExerciseList.fulfilled, (state, action) => {
            if (state.offset === 0) {
                state.status = 'idle'
                state.exerciseList = action.payload
            } else {
                state.status = 'idle'
                state.exerciseList = [...state.exerciseList, ...action.payload]
            }
        }).addCase(updateExerciseList.pending, (state) => {
            state.status = 'pending'
        })
    }
})

export const updateExerciseList = createAsyncThunk('/updateExerciseList', async (_, { getState }) => {
    try {
        const params = {
            muscle: getState().muscleExercise.muscle,
            offset: getState().muscleExercise.offset,
            type: getState().muscleExercise.type,
            difficulty: getState().muscleExercise.difficulty
        }
        const res = await getExercise(params)
        return res.data
    } catch (error) {
        throw error
    }
})
export const fetchExerciseListStauts = (state) => {
    return state.muscleExercise.status
}
export const fetchExerciseList = (state) => {
    return state.muscleExercise.exerciseList
}
export const fetchDifficulty = (state) => {
    return state.muscleExercise.difficulty
}
export const fetchtype = (state) => {
    return state.muscleExercise.type
}
export const fetchExercise = (state, exercise) => {
    return state.muscleExercise.exerciseList.find((item) => item.name === exercise)
}
export const { setmuscle, setPage, setType, setDifficulty } = muscleExercise.actions
export default muscleExercise.reducer