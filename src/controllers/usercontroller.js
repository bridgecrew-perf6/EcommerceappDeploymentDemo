const User = require("../models/user");

function signup(req,res) {
    let data = req.body;
    let responseData = {
        success : false,
        msg : "invalid details for signup"
    };
    if(data.username && data.password) {
        User.getUserssignupDetails(data,function(err,result) {
            if(err) {
                console.log(err);
                responseData.msg ="error in signup";
                return res.status(500).send(responseData);

            }
        if(result.length>0) {
            responseData.msg="user already exits"
            return res.status(500).send(responseData);
        } else {
            User.signup(data,function(err1,result1) {
                if (err1) {
                    return res.status(500).send(responseData);

                }
                console.log("user registration result",result1);
                responseData.success =true;
                responseData.msg ="successfully signup";
                responseData.data = {
                    username: data.username,
                    //userId:result.id
                };
                return res.status(200).send(responseData);
            })
        }
        })
    }else {
        return res.status(400).send(responseData);

    }
}
function login(req,res)   {
    let data = req.body;
    let responseData = {
        success : false,
        msg : "invalid details for signup"
    };
    if(data.username && data.password) {
        User.strongLogin(data,function(err,result) {
            if(err) {
                console.log(err);
                responseData.msg ="error in signup";
                return res.status(500).send(responseData);

            }
            if(result.length==0){
                responseData.msg ="invalid email or password";
                return res.status(500).send(responseData);
            }
            responseData.success= true;
            responseData.msg ="successfully logged in";
            responseData.data = {
                username: result[0].Username,
                userId: result[0].UserId,
                authToken: result[0].authToken
            };
            return res.status(200).send(responseData);
            })
        } else {
            return res.status(400).send(responseData);
        }

} 
module.exports = { signup,login };