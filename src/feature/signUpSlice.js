import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const initialState = {
    status: 'idle'
}

const signupslice = createSlice({
    name: 'signupslice',
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(signup.fulfilled, (state) => {
            state.status = 'success'
        }).addCase(signup.rejected, (state) => {
            state.status = 'failed'
        }).addCase(signup.pending, (state) => {
            state.status = 'pending'
        })
    }
})

export const signup = createAsyncThunk('signup', async ({ auth, email, password,  }) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        // if (avatar) {

        // }
        console.log(auth.currentUser)
        // updateProfile()
    } catch (err) {
        console.log('err', err)
    }
})
export const checkSignUpStatus = (state) => {
    console.log(state.signup)
    return state.signup.status
}
export default signupslice.reducer
