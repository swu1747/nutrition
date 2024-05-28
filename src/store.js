import { configureStore } from "@reduxjs/toolkit";
import UserInfoReducers from "./feature/UserInfoSlice";
import signUpSliceReducers from "./feature/signUpSlice";

export default configureStore({
    reducer: {
        user: UserInfoReducers,
        signup: signUpSliceReducers
    }
})