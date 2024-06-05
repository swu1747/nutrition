import { configureStore } from "@reduxjs/toolkit";
import UserInfoReducers from "./feature/UserInfoSlice";
import signUpSliceReducers from "./feature/signUpSlice";
import musclePartsReducers from './feature/musclePartsSlice'
import muscleExerciseReudcers from './feature/muscleExercise'
import calburnsliceReducers from "./feature/calburnslice";
export default configureStore({
    reducer: {
        user: UserInfoReducers,
        signup: signUpSliceReducers,
        muscleparts: musclePartsReducers,
        muscleExercise: muscleExerciseReudcers,
        calBurn: calburnsliceReducers
    }
})