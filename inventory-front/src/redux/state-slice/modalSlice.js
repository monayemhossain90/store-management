import {createSlice} from "@reduxjs/toolkit";

export const modalSlice=createSlice({
    name:'modal',
    initialState:{
        AddModalShow: false,
        MinusModalShow: false,
        ProductID:"",
        ExistUnit: 0
    },
    reducers:{
        SetAddModalShow:(state,action)=>{
            state.AddModalShow=action.payload
        },
        SetMinusModalShow:(state,action)=>{
            state.MinusModalShow=action.payload
        },
        SetProductID:(state,action)=>{
            state.ProductID=action.payload
        },
        SetExistUnit:(state,action)=>{
            state.ExistUnit=action.payload
        }
    }
})
export  const { SetAddModalShow, SetMinusModalShow, SetProductID, SetExistUnit}=modalSlice.actions;
export const selectAddModalShow = (state) => state.modal.AddModalShow;
export const selectMinusModalShow = (state) => state.modal.MinusModalShow;
export const selectProductID = (state) => state.modal.ProductID;
export const selectExistUnit = (state) => state.modal.ExistUnit;
export const modalSliceReducer = modalSlice.reducer;
