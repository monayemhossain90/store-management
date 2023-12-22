const ProductsModel = require("../../models/Products/ProductsModel");
const ProductReportService= async (req, res) => {
    try{

        let UserEmail=req.headers['email'];
        let FromDate=  req.body['FromDate']
        let ToDate=  req.body['ToDate']

        let data=await  ProductsModel.aggregate([
            {$match: {createdAt:{$gte:new Date(FromDate),$lte:new Date(ToDate)}}}
        ])

        res.status(200).json({status: "success", data: data});

    }
    catch (error) {
        res.status(500).json({status: "fail", data: error.toString()});
    }
}
module.exports=ProductReportService