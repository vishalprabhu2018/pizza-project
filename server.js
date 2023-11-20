const express=require('express');
const ejs=require('ejs');
const expressLayout=require('express-js-layouts')
const path=require('path');
const app=express();
const PORT=3300;

//set template engine
app.use(expressLayout);
app.use('views',path.join(__dirname,'./resources/views'));
app.set('view engine','ejs')



app.get('/',(req,res)=>{
    res.send('hello from server')
})

app.listen(PORT,()=>{
    console.log(`app is running at ${PORT} `);
})



