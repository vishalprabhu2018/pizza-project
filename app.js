const express=require('express');
const app=express();
const ejs=require('ejs');
const expressLayout=require('express-ejs-layouts')
const path=require('path');

// const initialPath=path.join(__dirname,'./views')

// app.use(express.static(initialPath))


//set template engine
app.use(expressLayout); 
// app.use('views',initialPath);
app.set('view engine','ejs');


//MIME error .  Where is Assest whe have to say it to the express
app.use(express.static('public'));




app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/cart',(req,res)=>{
    res.render('customers/cart')
})

app.get('/login',(req,res)=>{
    res.render('auth/login')
})

app.get('/register',(req,res)=>{
    res.render('auth/register')
})
module.exports = app;
