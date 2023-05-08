import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:[],
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
        logout:(state) =>{
            state.user = [];
            state.status = 'idle';
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(logout, (state) =>{
            state.user = [];
            state.status = 'idle';
        });
    }
})

export const { loginFail, loginSucces, logout} = authenSlice.actions
export default authenSlice.reducer