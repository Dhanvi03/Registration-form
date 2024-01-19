const express = require("express");
const app = express();
const path= require("path");
require("./db/conn");
const hbs = require('hbs');
const Register = require("./models/registers");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const view_path = path.join(__dirname,'../templates/views');
const partials_path = path.join(__dirname,'../templates/partials');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","hbs");
app.set("views",view_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
});

app.post("/register",async (req,res)=>{
    try{
        const {username, email, password, comfirmpassword} = req.body;

            if(password === comfirmpassword){
                const registerEmployee = new Register({
                    username,
                    email,
                    password,
                    comfirmpassword
                });
                const registered = await registerEmployee.save();
                res.status(201).render("success");
            }else{
                res.send("Passwords are not matching.");
            }

    }catch(err){

        res.status(400).render("error");
    }
});

app.get("/success",(req,res)=>{
    res.render("success");
});

app.get("/error",(req,res)=>{
    res.render("error");
});
app.use(express.static(static_path));

app.get("/",(req,res)=>{
    res.send("Hi from dhanvi patel");
});

app.listen(port,()=>{
    console.log(`Listening port number ${port}`);
});