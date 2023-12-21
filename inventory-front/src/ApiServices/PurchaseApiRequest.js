import store from "../redux/store/store";
import axios from "axios";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {
    SetProductDropDown,
    SetPurchaseList,
    SetPurchaseListTotal,
    SetSupplierDropDown
} from "../redux/state-slice/purchaseSlice";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
const AxiosHeader={headers:{"token":getToken()}}

export async function PurchaseListRequest(pageNo, perPage, searchKeyword) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/PurchasesList/"+pageNo+"/"+perPage+"/"+searchKeyword;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetPurchaseList(result.data['data'][0]['Rows']))
                store.dispatch(SetPurchaseListTotal(result.data['data'][0]['Total'][0]['count']))
            } else {
                store.dispatch(SetPurchaseList([]))
                store.dispatch(SetPurchaseListTotal(0))
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


export async function ProductDropDownRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/ProductsDropDown";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'].length > 0) {
                store.dispatch(SetProductDropDown(result.data['data']))
            } else {
                store.dispatch(SetProductDropDown([]));
                ErrorToast("No Product Found");
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


export async function SupplierDropDownRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/SuppliersDropDown";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'].length > 0) {
                store.dispatch(SetSupplierDropDown(result.data['data']))
            } else {
                store.dispatch(SetSupplierDropDown([]));
                ErrorToast("No Supplier Found");
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



export async function CreatePurchaseRequest(ParentBody,ChildsBody, ProcessingBtnRef) {
    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "  Processing...";
        let PostBody={"Parent":ParentBody, "Childs":ChildsBody}
        let URL = BaseURL+"/CreatePurchase"
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Save Change";
        if (res.status === 200 && res.data['status'] === "success") {
            SuccessToast("Purchase Create Success");
            return true;
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Save Change";
        return  false
    }
}




export async function PurchasesDeleteRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/PurchasesDelete/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Purchase Delete Success");
            return true
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false
    }
}


