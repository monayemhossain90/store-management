import store from "../redux/store/store";
import axios from "axios";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {
    SetProductBrandDropDown,
    SetProductCategoryDropDown, SetProductData,
    SetProductList,
    SetProductListTotal, SetProductReportDataList,
} from "../redux/state-slice/productSlice";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {SetExpensesByDateList} from "../redux/state-slice/reportSlice.js";
const AxiosHeader={headers:{"token":getToken()}}

export async function ProductListRequest(pageNo, perPage, searchKeyword) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/ProductsList/"+pageNo+"/"+perPage+"/"+searchKeyword;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'][0]['Rows'].length > 0) {
                console.log(result.data['data'][0]['Rows']);
                store.dispatch(SetProductList(result.data['data'][0]['Rows']))
                store.dispatch(SetProductListTotal(result.data['data'][0]['Total'][0]['count']))
            } else {
                store.dispatch(SetProductList([]))
                store.dispatch(SetProductListTotal(0))
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
    }
}




//CategoryDropDown
export async function ProductCategoryDropDownRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/CategoriesDropDown";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'].length > 0) {
                store.dispatch(SetProductCategoryDropDown(result.data['data']))
            }
            else {
                store.dispatch(SetProductCategoryDropDown([]));
                ErrorToast("No Product Category Found");
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}


//BrandDropDown
export async function ProductBrandDropDownRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/BrandDropDown";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'].length > 0) {
                store.dispatch(SetProductBrandDropDown(result.data['data']))
            }
            else {
                store.dispatch(SetProductBrandDropDown([]));
                ErrorToast("No Product Brand Found");
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



//CreateProduct
export async function CreateProductRequest(productName,brandID,categoryID,unit, price,details,ProcessingBtnRef) {

    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/CreateProduct"
        let PostBody = {CategoryID:categoryID,BrandID:brandID,ProductName:productName,Unit:unit,Price:price,Details:details};
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Create Product";
        if (res.status === 200){
            if(res.data['status'] === "success"){
                SuccessToast("Product Create Success");
                return true;
            }else{
                ErrorToast("Something Went Wrong")
                return false;
            }
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Create Product";
        ErrorToast("Something Went Wrong")
        return false;
    }
}



export async function FillProductFormRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/ProductsDetailsByID/"+ObjectID;
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            store.dispatch(SetProductData(res.data['data']));
            return true;
        } else {
            debugger;
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        debugger;
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return  false
    }
}


//UpdateProduct
export async function UpdateProductRequest(productName,brandID,categoryID,unit,details,ObjectID,ProcessingBtnRef) {
    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/UpdateProduct/"+ObjectID;
        let PostBody = {CategoryID:categoryID,BrandID:brandID,ProductName:productName,Unit:unit,Price:price,Details:details};
        const res = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Save Change";
        if(res.status === 200){
            if(res.data['status'] === "success"){
                SuccessToast("Product Update Success");
                return true;
            }else{
                ErrorToast("Something Went Wrong")
                return false;
            }
        }
        else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Save Change";
        ErrorToast("Something Went Wrong")
        return  false
    }
}


export async function UpdateStockRequest(unit,ObjectID) {
    try {
        store.dispatch(ShowLoader())

        let URL = BaseURL+"/UpdateProduct/"+ObjectID;
        let PostBody = {Unit:unit};
        const res = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())

        if(res.status === 200){
            if(res.data['status'] === "success"){
                SuccessToast("Product Update Success");
                return true;
            }else{
                ErrorToast("Something Went Wrong")
                return false;
            }
        }
        else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return false
    }
}



export async function DeleteProductRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteProduct/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status'] === "associate") {
            ErrorToast("Failled! Product is "+result.data['data'])
            return false;
        }
        else if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Product Delete Success");
            return  true
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}








