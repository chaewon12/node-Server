const express = require('express');
const router=express.Router();
const  path=require('path');

router.get('/', function(req, res) {
    var id=req.user;
    if(!id) res.render('login.ejs');
    res.render('main.ejs',{'id':id});
});

//express 모듈의 Router() 를 이용하면, 라우팅을 다른 js 파일에서도 가능하게 함
module.exports=router; 