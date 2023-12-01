const User=require('../../models/user')
const bcrypt=require('bcrypt');

function authController(){
    return{
        login(req,res){
            res.render('auth/login')
        },
        register(req,res){
         res.render('auth/register')
        },
         async postRegister(req,res){
         const {name, email, password}=req.body
          
          if(!name,!email,!password){
            req.flash('error','All fields are required'); 
            req.flash('name',name);
            req.flash('email',email);
            return res.redirect('/register')
          }
         
          //check if email exist
          const existingUser = await User.findOne({email})
          if (existingUser) {
            req.flash('error','Email already exist'); 
            req.flash('name',name);
            req.flash('email',email);
            return res.redirect('/register')
          }
          //hash password
    const hashedPassword= await bcrypt.hash(password,10);
          
          //create new user
          const user=new User({
            name,
            email,
            password:hashedPassword
          })

          user.save().then((user)=>{
          // Login functionality add later here
          return res.redirect('/')
          }).catch(err=>{
            req.flash('error','Something went wrong'); 
            return res.redirect('/register')
          })



          console.log(req.body)
        }
    }
}


module.exports=authController;