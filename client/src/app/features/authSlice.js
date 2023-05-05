import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    status: 'idle',
    error: null,
}

export const authenSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginSucces:(state,{payload}) => {
            state.status = 'success';
            state.user = payload
        },
        loginFail:(state,{payload}) => {
            state.status = 'fail'
            state.error = payload
        },

    },
})

export const { loginFail, loginSucces} = authenSlice.actions
export default authenSlice.reducer