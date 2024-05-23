const express=require("express");
const app=express();//initializing  our app
const bodyParser=require("body-parser");
const cors=require("cors");
const mysql=require("mysql2");


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

//Database connection with MySql
const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"ahmad1122",
    database:"contact_db_react",
});
//VIEW API
app.get("/view",(req,res)=>{

    const sqlSelect="Select * from contact_tb";
    db.query(sqlSelect,(error,result)=>{
        if(error)
        {
            console.log("error:",error);
        }
        res.send(result); 
    });
});
//INSERT API
app.post("/post",(req,res)=>{
    const {Name,Email,contact}=req.body;
    // console.log(req.body)
    const sqlInsert="INSERT INTO contact_tb (Name,Email,contact) VALUES (?,?,?)";
    db.query(sqlInsert,[Name,Email,contact],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})
//DELETE API
app.delete("/delete/:id",(req,res)=>{
    console.log("API call delete");

    const {id}=req.params;
    console.log("ID2:",id);
    const sqlDelete="Delete FROM contact_tb WHERE ID = ?";
    db.query(sqlDelete,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});
//UPDATE API
app.get("/get/:id",(req,res)=>{

    const {id}=req.params;
    const sqlSelect="SELECT * FROM contact_tb WHERE ID=?";
    db.query(sqlSelect,id,(error,result)=>{
        if(error)
        {
            console.log("Get Error:",error);
        }
        res.send(result); 
    });
});
app.put("/put/:id",(req,res)=>{

    const {id}=req.params;
    const {Name,Email,contact}=req.body;
    const sqlUpdate="UPDATE contact_tb SET Name = ? , Email = ? , contact = ? WHERE ID=?";
    db.query(sqlUpdate,[Name,Email,contact,id],(error,result)=>{
        if(error)
        {
            console.log("Updation Error:",error);
        }
        res.send(result); 
    });
});
//



app.listen(5000,()=>{
    console.log("Server Port:5000");
})
 