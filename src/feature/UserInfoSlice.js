import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL } from "firebase/storage";

const inititalState = {
    status: 'idle',
    name: '',
    photoURL: null
}

const UserInfo = createSlice({
    name: 'UserInfo',
    initialState: inititalState,
    reducers: {
        changeUserState: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchphoto.fulfilled, (state, action) => {
            state.photoURL = action.payload
        })
    }
})
export const fetchphoto = createAsyncThunk('fetchphoto', async (photoref) => {
    try {
        const res = await getDownloadURL(photoref)
        return res
    } catch (err) {
        throw err
    }
})
export default UserInfo.reducer
export const checkUserStat = (state) => {
    return state.user.status
}
export const checkUserphoto = (state) => {
    return state.user.photoURL
}
export const { changeUserState } = UserInfo.actions