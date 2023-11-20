const express=require('express');
const app=express();
const ejs=require('ejs');
const expressLayout=require('express-ejs-layouts')
const path=require('path');


const initialPath=path.join(__dirname,'./resources/views')

app.use(express.static(initialPath))



//set template engine
// app.use(expressLayout);
// app.use('views',initialPath);
app.set('view engine','ejs')





app.get('/',(req,res)=>{
    res.render('home')
})

module.exports = app;
