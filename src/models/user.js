const sqlconnection = require("../services/sqlConnection");
const sqlConnnection = require("../services/sqlConnection");
const bcrypt = require("bcryptjs");
const auth = require("../util/auth");
function signup (data,cb)
{
var sql=`INSERT INTO Users
        (Username, Password, createdAt, updatedAt, userType)
        Values(?,?,now(),now(), 1)`;
        let values = [];
        values.push(data.username);
        values.push(data.password);
        console.log(sql);
        console.log(values);
        sqlConnnection.executeQuery(sql,values,function(err,result) {
            cb (err,result);

        });
}
function strongSignup(data,cb) {
    var sql=`INSERT INTO Users
        (Username, Password, createdAt, updatedAt, userType)
        Values(?,?,now(),now(), 1)`;
        let values = [];
        values.push(data.username);
        bcrypt.hash(data.password, 8, function(err , hash) {
            if(err) {
                console.log(err);
                return;
            }
            values.push(hash);
        sqlConnnection.executeQuery(sql,values,function(err,result) {
            cb (err,result);

        });
    });

}

function getUserssignupDetails(data,cb) {
    let sql = "SELECT * FROM Users WHERE Username = ?";
    let values = [];
    values.push(data.username);
    sqlconnection.executeQuery(sql,values,function(err,result) {
        cb(err,result);
    });
}

function login(data,cb) {
    let sql = `SELECT ID as UserId , Username , UserType 
               FROM Users WHERE
               Username=? AND Password =?`;
let values = [];
values.push(data.username);
values.push(data.password);
sqlconnection.executeQuery(sql,values,function(err,result) {
    cb(err,result);
});
}
function strongLogin(data,cb) {
    let sql = `SELECT ID as UserId , Username , Password, UserType 
    FROM Users WHERE
    Username=? AND Password =?`;
let values = [];
values.push(data.username);
sqlconnection.executeQuery(sql,values,function(err,result) {
    // console.log(data.password,result,result[0].password);
     const isValisPass = bcrypt.compareSync(data.password,result[0].Password);
     if(isValidPass) {
          const token= auth.newToken(result);
         const response
          = [
             {
                 UserId: result[0].UserId,
                 Username:result[0].Username,
                 UserType:result[0].UserType,
                 authToken:token
             }
         ];
         cb(err, response);
     } else {

            cb(err,[]);
     }
});

}
module.exports  = {signup, getUserssignupDetails,login,strongSignup,strongLogin};