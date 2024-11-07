import { createSlice } from "@reduxjs/toolkit";

const initialState={
    imageBlob:null,
    images : null
}

const imageSlice=createSlice({
    name:'image',
    initialState,
    reducers:{
        setImageBlob:(state,action)=>{
            state.imageBlob=action.payload;
        },
        clearImageBlob:(state)=>{
            state.imageBlob=null;
        },
        setImage:(state,action)=>{
            state.images=action.payload;
        },
        clearImages:(state)=>{
            state.images=null;
        }   

    }
})

export const {setImageBlob,clearImageBlob , setImage , clearImages}=imageSlice.actions;
export const getImageBlob=(state)=>state.image.imageBlob;
export const getImage=(state)=>state.image.images;
export default imageSlice.reducer;