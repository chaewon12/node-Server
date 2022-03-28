const express = require('express');
const router=express.Router();
const  path=require('path');
const main =require('./main');
const email =require('./email');
const join =require('./join/index');
const login =require('./login/index');
const logout =require('./logout/index');
const movie =require('./movie/index');

//root url routing
router.get('/', (req, res) => res.sendFile(path.join(__dirname,"../public/main.html")));

router.get('/form', (req, res) => res.sendFile(path.join(__dirname,"../public/form.html")));

router.use('/main',main);
router.use('/email',email);
router.use('/join',join);
router.use('/login',login);
router.use('/logout',logout);
router.use('/movie',movie);

module.exports=router; 