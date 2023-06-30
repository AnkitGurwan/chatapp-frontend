import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    owner : null,
    allUsers:[],
    token : null,
    chat : null,
    allChats : null,
}

export const authslice = createSlice ({
    name : "userchat",
    initialState,
    reducers:{
        setLogin : (state,action) => {
            state.user = action.payload.user;
            state.token =action.payload.token || null;
        },
        setOwner : (state,action) => {
            state.owner = action.payload;
        },
        setChat : (state,action) => {
            state.chat = action.payload;
        },
        setAllUsers : (state,action) => {
            return {
                ...state,
                allUsers: action.payload
              }; 
        },
        setAllChats : (state,action) => {
            return {
                ...state,
                allChats: action.payload
              }; 
        },
        setLogout : (state,action) => {
            state.user = null;
            state.token = null
        }
    }
})

export const {  setLogin , setLogout ,setAllUsers,setOwner,setChat,setAllChats} = authslice.actions;
export default authslice.reducer;