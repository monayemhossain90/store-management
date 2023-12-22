const DataModel = require("../../models/Products/ProductsModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");

const DeleteService = require("../../services/common/DeleteService");

const DetailsByIDService = require("../../services/common/DetailsByIDService");
const DropDownService = require("../../services/common/DropDownService");
const ProductReportService = require("../../services/report/ProductReportService");


exports.CreateProduct=async (req, res) => {
    let Result= await CreateService(req,DataModel);
    res.status(200).json(Result)
}

exports.UpdateProduct=async (req, res) => {
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result)
}

exports.ProductsList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage1={$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "Brands"}};
    let JoinStage2= {$lookup: {from: "categories", localField: "CategoryID", foreignField: "_id", as: "Categories"}};
   let Projection = {$project:{_id:1, UserEmail:1, ProductName:1, Unit:1,Price:1, CategoryID:1, BrandID:1, Details:1, createdAt:1, updatedAt:1, BrandName:{$first:"$Brands.BrandName"}, CategoryName:{$first:"$Categories.CategoryName"}}}

    let SearchArray=[{ProductName: SearchRgx},{Unit: SearchRgx},{Price: SearchRgx},{Details: SearchRgx},{BrandName:SearchRgx},{CategoryName:SearchRgx}]
    let Result=await ListTwoJoinService(req,DataModel,SearchArray,JoinStage1,JoinStage2,Projection);
    res.status(200).json(Result)
}


exports.ProductsDetailsByID=async (req, res) => {
    let Result= await DetailsByIDService(req,DataModel)
    res.status(200).json(Result)
}


exports.DeleteProduct=async (req, res) => {
    
   if(CheckPurchaseAssociate){
        res.status(200).json({status: "associate", data: "associated with Purchase Products"})
    }
  
    else{
        let Result=await DeleteService(req,DataModel);
        res.status(200).json(Result)
    }
}




exports.ProductsDropDown=async (req, res) => {
    let Result= await DropDownService(req,DataModel,{_id:1,ProductName:1})
    res.status(200).json(Result)
}



exports.ProductsReportByDate=async (req, res) => {
    await ProductReportService(req,res)
}


