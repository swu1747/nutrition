import { configureStore } from "@reduxjs/toolkit";
import UserInfoReducers from "./feature/UserInfoSlice";
import signUpSliceReducers from "./feature/signUpSlice";
import musclePartsReducers from './feature/musclePartsSlice'
import muscleExerciseReudcers from './feature/muscleExercise'
import calburnsliceReducers from "./feature/calburnslice";
import settimerReducers from './feature/timeSetterSlice'
import { setStart, setEnd } from "./feature/timeSetterSlice";
import nuitriSliceReducers from "./feature/nuitriSlice";
import FoodDetailReducers from './feature/foodDetailSlice'
import daynutriReducers from './feature/everydaynutri'
import MonthlyCalBurnReducers from './feature/MonthlyCalBurnSlice'
export default configureStore({
    reducer: {
        user: UserInfoReducers,
        signup: signUpSliceReducers,
        muscleparts: musclePartsReducers,
        muscleExercise: muscleExerciseReudcers,
        calBurn: calburnsliceReducers,
        settime: settimerReducers,
        nuitritionSearch: nuitriSliceReducers,
        foodDetail: FoodDetailReducers,
        daynutri: daynutriReducers,
        MonthlyCalBurn: MonthlyCalBurnReducers
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [setStart.type, setEnd.type],
                ignoredPaths: ['settime.start', 'settime.end'],
            },
        })
})