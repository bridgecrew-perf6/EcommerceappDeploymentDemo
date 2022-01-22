const sqlConnection = require("../services/sqlConnection");

function listProducts(data, cb)
{
    var sql="Select ID as productId, Name as name, Price as price from Products";
    var values = [];
    if(data.categoryId)
    {
        sql +=" WHERE categoryID = ?";
        values.push(data.categoryId);
        if(data.minPrice){
            sql += " AND Price >=?";
            values.push(data.minPrice);
        }
    }else if(data.minPrice){
        sql += " WHERE Price >= ?";
        values.push(data.minPrice);
    }else if(data.maxPrice){
        sql += " WHERE Price <= ?";
        values.push(data.maxprice);
    }
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    })
}

function addProduct(data,cb) {
    var sql = `INSERT INTO Products
               (Name, Price, Description, CategoryId, VendorId, createdAt, updatedAt)
               values(?, ? ,? , ? , ? , now() , now())
               `;
               var values = [];
               values.push(data.name);
               values.push(data.price);
               values.push(data.description);
               values.push(data.categoryId);
               values.push(data.vendorId);
               sqlConnection.executeQuery(sql,values,function(err,result) {
                   cb(err, result);
               });
}

module.exports = {listProducts, addProduct};