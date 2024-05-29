import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage()
const initialState = {
    status: 'idle'
}

const signupslice = createSlice({
    name: 'signupslice',
    initialState: initialState,
    reducers: {
        setStatusIdle: (state) => {
            state.status = 'idle'
        }
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

export const signup = createAsyncThunk('signup', async ({ auth, email, password, username, avartarurl }) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        if (avartarurl) {
            const storageRef = ref(storage, `avatar/${avartarurl.name}`)
            await uploadBytes(storageRef, avartarurl)
        }
        await updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: avartarurl ? `avatar/${avartarurl.name}` : null
        })
    } catch (err) {
        console.log('err', err)
        throw err
    }
})
export const checkSignUpStatus = (state) => {
    return state.signup.status
}
export const { setStatusIdle } = signupslice.actions
export default signupslice.reducer
