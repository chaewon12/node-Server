const express = require('express');
const router=express.Router();
var path=require('path');
const mysql=require('mysql');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const connection=mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'my_db'
});
connection.connect();

router.get('/',function(req, res) {
    var msg;
    var errMsg=req.flash('error');
    if(errMsg) msg=errMsg;
    res.render('join.ejs',{'message':msg});
});

//세션 저장
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//세션에서 id를 꺼내옴
passport.deserializeUser(function(id,done){
    done(null,id);
})

passport.use('local-join',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req,email, password, done){
    var query=connection.query('SELECT * FROM user WHERE email = ?', [ email ]
        ,function(err, rows){
            if (err) return done(err);
            if (rows.length) { 
                return done(null, false, { message: 'your email is already'});
            }else{
                var sql={email: email, password:password};
                var query=connection.query('insert into user set ? ;', sql,
                function(err,rows){
                    if(err) throw err;
                    return done(null,{'email':email, 'id':rows.insertId});
                });
            }
    })   
}));

router.post('/',passport.authenticate('local-join', { 
    successRedirect:'/main',
    failureRedirect: '/join',
    failureFlash: true
}));

module.exports=router; 