const Product = require("../models/products");

function listProduct(req, res) {
    let data = req.body;
    console.log(req.body.categoryId);
    Product.listProducts(data, function(err, result) {
        if(err) {
            console.log(err);
            return res.status(500).send({message:"not ok"});
        }
        return res.status(200).send({
            success:true,
            msg:"sucessfully fetched product",
            product:result
        })
    })
}

function addProduct(req, res) {
     let data = req.body;
     console.log(data);
     if(data.name && data.price && data.description && data.categoryId && data.vendorId){
     Product.addProduct(data, function(err, result) {
        if(err) {
            console.log(err);
            return res.status(500).send({message:"not ok"});
        }
        return res.status(200).send({
            success: true,
            msg: "sucessfully added product",
            product: result
        })
     })
}
}

module.exports = {listProduct, addProduct};