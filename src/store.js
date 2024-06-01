import { configureStore } from "@reduxjs/toolkit";
import UserInfoReducers from "./feature/UserInfoSlice";
import signUpSliceReducers from "./feature/signUpSlice";
import musclePartsReducers from './feature/musclePartsSlice'
export default configureStore({
    reducer: {
        user: UserInfoReducers,
        signup: signUpSliceReducers,
        muscleparts: musclePartsReducers
    }
})