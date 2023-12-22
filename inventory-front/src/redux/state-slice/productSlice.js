import {createSlice} from "@reduxjs/toolkit";
export const productSlice=createSlice({
    name:'product',
    initialState:{
        List:[],
        ListTotal:0,
        ProductBrandDropDown:[],
        ProductCategoryDropDown:[],
        ProductData:{},
        ProductReportDataList:[]
    },
    reducers:{
        SetProductList:(state,action)=>{
            state.List=action.payload
        },
        SetProductListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetProductBrandDropDown:(state,action)=>{
            state.ProductBrandDropDown=action.payload
        },
        SetProductCategoryDropDown:(state,action)=>{
            state.ProductCategoryDropDown=action.payload
        },
        SetProductData:(state,action)=>{
            state.ProductData=action.payload
        },
        SetProductReportDataList:(state,action)=>{
            state.ProductReportDataList=action.payload
        },
    }
})

export const {SetProductList,SetProductListTotal,SetProductBrandDropDown,SetProductCategoryDropDown, SetProductData, SetProductReportDataList}=productSlice.actions;
export const selectProductList = (state) => state.product.List;
export const selectProductListTotal = (state) => state.product.ListTotal;
export const selectProductCategoryDropDown = (state) => state.product.ProductCategoryDropDown;
export const selectProductBrandDropDown = (state) => state.product.ProductBrandDropDown;
export const selectProductReportDataList = (state) => state.product.ProductReportDataList;

export const productSliceReducer = productSlice.reducer;