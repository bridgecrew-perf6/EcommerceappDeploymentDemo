const Category = require('../models/category');

module.exports = {
    listCategories: function(req,res) {
       Category.listCategory(function(err,result){
        if(err){
            console.log(err);
           return res.send({
               message :"error in fetching",
        success:false,
    status:500
});
        }
        
     return  res.send({
         message: "successfully fetched categories",
         categories:result,
        success:true,
        status:200
    });
    })
    }
}