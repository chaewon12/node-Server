const express = require('express');
const router=express.Router();
var path=require('path');
const mysql=require('mysql');

const connection=mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'my_db'
});
connection.connect();

router.post('/email_post',function(req, res) {
    res.render('email.ejs',{email:req.body.email});
});

router.post('/ajax_send_email',function(req, res) {
    var email=req.body.email;
    var responseData={};
    var query=connection.query('select username from user where email="'+email+'"',
        function(err,rows){
            if(err) throw err;
            if(rows[0]){
                responseData.result="ok";
                responseData.username=rows[0].username;
            }else{
                responseData.result="none";
                responseData.username="";
            }
            res.json(responseData);
        });
});

module.exports=router; 