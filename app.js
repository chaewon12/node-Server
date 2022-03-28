const express = require('express');
const app = express();
const port = 3000;
const bodyParser=require('body-parser');
const router =require('./router/index');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const session=require('express-session');
const flash=require('connect-flash');

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}/main`));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(router);