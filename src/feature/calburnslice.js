import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCalBurn } from "../clientapi";

const initialState = {
    status: 'idle',
    searchItem: '',
    searchRes: [],
    openModal: false
}

const calBurnSlice = createSlice({
    name: 'calBurn',
    initialState: initialState,
    reducers: {
        setSearchItem: (state, action) => {
            state.searchItem = action.payload
        },
        changeExpand: (state, action) => {
            state.searchRes.forEach((item) => {
                item.expand = item.name === action.payload ? true : false
            })
        },
        changeModal: (state) => {
            state.openModal = !state.openModal
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchRes.fulfilled, (state, action) => {
            const list = action.payload
            list.forEach((item) => {
                item.expand = false
            })
            state.status = 'success'
            state.searchRes = list
        })
    }
})

export const fetchSearchRes = createAsyncThunk('searchRes', async (_, { getState }) => {
    const param = { activity: getState().calBurn.searchItem }
    const res = await getCalBurn(param)
    return res.data
})
export const { setSearchItem, changeExpand,changeModal } = calBurnSlice.actions
export const fetchSearchItem = (state) => {
    return state.calBurn.searchItem
}
export const fetchStatus = (state) => {
    return state.calBurn.status
}
export const getSearchRes = (state) => {
    return state.calBurn.searchRes
}
export const getModal = (state) => {
    return state.calBurn.openModal
}

export default calBurnSlice.reducer
