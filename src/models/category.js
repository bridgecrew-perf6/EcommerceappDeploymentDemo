const sqlConnection = require("../services/sqlConnection");

function listCategory(cb){
        var sql="select ID as categoryId,Name as name FROM Categories"; 
        var data=[];
        sqlConnection.executeQuery(sql,data,function(err,result){
        cb(err, result);
        })

    }
module.exports={listCategory};