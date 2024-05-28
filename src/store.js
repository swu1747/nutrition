import { configureStore } from "@reduxjs/toolkit";
import UserInfoReducers from "./feature/UserInfoSlice";


export default configureStore({
    reducer: {
        user: UserInfoReducers
    }
})