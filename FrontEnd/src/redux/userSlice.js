import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:'',
    email:'',
    api_key:''
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            const {api_key,email,_id}=action.payload;
            state.api_key=api_key;
            state.email=email;
            state._id=_id;
        },
        clearUserInfo:(state,action)=>{
            state.api_key='';
            state.email='';
            state._id='';
        }
    }
})

export const {setUserInfo,clearUserInfo}=userSlice.actions;
export default userSlice.reducer;