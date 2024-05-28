import { createSlice } from "@reduxjs/toolkit";


const inititalState = {
    status: 'idle',
    name: ''
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

    }
})

export default UserInfo.reducer
export const checkUserStat = (state) => {
    return state.user.status
}
export const { changeUserState } = UserInfo.actions