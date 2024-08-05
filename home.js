const express = require('express');
const path= require("path");
const bodyparser = require("body-parser");
const con=require("./connection")

const app= express();
app.set(bodyparser.json())
app.use(bodyparser.urlencoded());
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,'to do list')));
// app.use(express.static("public"));

app.get("/",(request,response)=>{
    // response.sendFile(__dirname+'/to do list/index.html');
   
    con.connect((error)=>{
        if(error){
            console.log("error 1.")
        } 
        const sql=`select data from todolist;`;
        con.query(sql,(err,result)=>{
            try{
                if(err)
                {
                    console.log("sql error get");
                    throw err;
                }
                response.render(__dirname+'/to do list/index',{data:result});
                // console.log(result);
            }
            catch(e)
            {
                console.log("some error");
            }
        })
    })
})


app.post('/',(req,res)=>{
    const data = req.body.input;
    // console.log(data);

    con.connect((error)=>{
        if(error){
            console.log("error 02.")
            // console.log(error);
        } 
        const sql=`INSERT INTO todolist (data) VALUES ('${data}')`;
        con.query(sql,(err,result)=>{
            try{
                if(err)
                {
                    console.log("sql insert error");
                    throw err;
                }
                // response.render(__dirname+'/to do list/index.ejs',{data:result});

                res.redirect('/');
                // console.log(result);
            }
            catch(e)
            {
                console.log("some error");
                console.log(e)
            }
        })
    })
})

app.get("/delete",(req,res)=>{
    con.connect((error)=>{
        if(error)
        {
            console.log("Error 2.");
            // console.log(error);
        }

        const value=req.query.data;
        console.log(value);

        const sql=`DELETE FROM todolist WHERE data='${value}';`;
        con.query(sql,(err,result)=>{
            try{
                if(err)
                {
                    console.log("error 3. delete")
                    throw err;
                }
                res.redirect('/');
                // console.log(result);

            }
            catch(e)
            {
                console.log("some error");
            }
        })
    })
})


app.listen(80,()=>{
    console.log("server on in 80 part number \n http://localhost:80/");
})