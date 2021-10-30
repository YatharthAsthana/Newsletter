//jshint esversion:6
const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var Email=req.body.email;
    var data={
        members:[
        {
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }]
    };
    var jsonData=JSON.stringify(data);
    // console.log(firstName, lastName,Email);
    const url="https://us5.api.mailchimp.com/3.0/lists/d7ea21dc2b";
    const options={
        method:"POST",
        auth:"Yatharth:0536916b8efc0a4f5f33a058fc1934e5-us5"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server is running on port 3000");
});

// API KEY
// 0536916b8efc0a4f5f33a058fc1934e5-us5

// list id 
// d7ea21dc2b