import { createSlice } from "@reduxjs/toolkit";

const initialState={
    imageBlob:null
}

const imageSlice=createSlice({
    name:'image',
    initialState,
    reducers:{
        setImageBlob:(state,action)=>{
            state.imageBlob=action.payload;
        },
        clearImageBlob:(state,action)=>{
            state.imageBlob=null;
        }
    }
})

export const {setImageBlob,clearImageBlob}=imageSlice.actions;
export default imageSlice.reducer;