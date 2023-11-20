const express=require('express');
const app=require('./app.js');
const PORT=3000;






app.listen(PORT,()=>{
    console.log(`app is running at ${PORT} `);
})



