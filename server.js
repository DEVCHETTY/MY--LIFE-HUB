const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req,res)=>{
res.send("Backend Running 🔥");
});


// ✅ SIGNUP API
app.post("/signup",(req,res)=>{

const { username, password } = req.body;

let users = JSON.parse(fs.readFileSync("users.json"));

const exist = users.find(u=>u.username===username);

if(exist){
return res.json({success:false,message:"User already exists"});
}

users.push({username,password});

fs.writeFileSync("users.json",JSON.stringify(users,null,2));

res.json({success:true});

});


// ✅ LOGIN API
app.post("/login",(req,res)=>{

const { username, password } = req.body;

let users = JSON.parse(fs.readFileSync("users.json"));

const user = users.find(
u=>u.username===username && u.password===password
);

if(user){
res.json({success:true});
}else{
res.json({success:false,message:"Invalid login"});
}

});


app.listen(5000,()=>{
console.log("Server running on port 5000 🚀");
});
