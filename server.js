require('dotenv').config();
const express=require('express');
const app=express();
const ejs=require('ejs');
const expressLayout=require('express-ejs-layouts')
const PORT=3000;
const mongoose=require('mongoose');
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)



mongoose.connect('mongodb://localhost:27017/pizzaProject');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).on('error', function (err) {
    console.log(err);
  });


//Session store
let mongoStore=new MongoDbStore({
    mongooseConnection:connection,  //from above variable
    collection:'sessions',
    
  })
   
  //   Session Config
  app.use(session({
    secret:'vishal',
    resave:false,
    store:mongoStore,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24}      //24hr
  
  }))

  

app.use(flash());

//Assests
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//Global MiddleWare
app.use((req,res,next)=>{
  res.locals.session=req.session;
  next();
})

//set template engine
app.use(expressLayout); 
// app.use('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');


require('./routes/web')(app)  //called the function with parameter 


app.listen(PORT,()=>{
    console.log(`app is running at ${PORT} `);
})



