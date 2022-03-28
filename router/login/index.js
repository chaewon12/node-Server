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
    res.render('login.ejs',{'message':msg});
});

//세션 저장
passport.serializeUser(function(user,done){
    console.log('passport session save ',user.id);
    done(null,user.id);
});
//세션에서 id를 꺼내옴
passport.deserializeUser(function(id,done){
    console.log('passport session get ',id);
    done(null,id);
})

passport.use('local-login',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req,email, password, done){
    var query=connection.query('SELECT * FROM user WHERE email = ?', [ email ]
        ,function(err, rows){
            if (err) return done(err);
            if (rows.length) { 
                return done(null,{'email':email, 'id':rows[0].id});
            }else{
                return done(null,false,{'message':'your login info is not found'});
            }
    })   
}));

router.post('/',function(req,res,next){
    passport.authenticate('local-login',function(err,user,info){
        if(err) res.status(500).json(err);
        if(!user) return res.status(401).json(info.message);

        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.json(user);
        });
    })(req,res,next);
});

module.exports=router; 