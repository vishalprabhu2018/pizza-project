require('dotenv').config();
const express=require('express');
const app=express();
const ejs=require('ejs');
const expressLayout=require('express-ejs-layouts')
const PORT=3000;
const mongoose=require('mongoose');
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session);
const passport = require('passport');





mongoose.connect(process.env.MONGO_CONNECTION_URL);
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

  // Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

  

app.use(flash());

//Assests
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}))
app.use(express.json());

//Global MiddleWare
app.use((req,res,next)=>{
  res.locals.session=req.session;
  res.locals.user=req.user;
  next();
})


//set template engine
app.use(expressLayout); 
// app.use('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');


require('./routes/web')(app)  //called the function with parameter 

app.set('404 ',false);
app.use((req,res)=>{
res.status(400).render('404',{layout:'404'})
})


const server=app.listen(PORT,()=>{
    console.log(`app is running at ${PORT} `);
})


