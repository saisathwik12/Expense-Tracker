import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name : "auth",
    initialState : {
        isLoading : false,
        user : null,
        isAuthenticated: false
    },
    reducers : {
        setLoading : (state,action) =>{
            state.isLoading = action.payload
        },
        setAuthUser : (state,action) =>{
            state.user = action.payload
        },
        setAuthenticate : (state,action) =>{
            state.isAuthenticated = action.payload
        }
    }
})

export const {setLoading,setAuthUser,setAuthenticate} = authSlice.actions;

export default authSlice.reducer;