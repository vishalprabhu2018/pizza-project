const homeController=require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');
const cartController=require('../app/http/controllers/customers/cartController');

const orderController = require('../app/http/controllers/customers/orderController');

const adminOrderController = require('../app/http/controllers/admin/orderController');

const statusController = require('../app/http/controllers/admin/statusController')

const developer=require('../app/http/controllers/developer');

//Middlewares
const guest=require('../app/http/middlewares/guest');
const auth=require('../app/http/middlewares/auth');
const adminAuth=require('../app/http/middlewares/admin')
function initRoutes(app){
    
    app.get('/',homeController().index)

    app.get('/login',guest,authController().login)
    app.post('/login',authController().postLogin)
    app.get('/register',guest,authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)


    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)

    //customer routes
    app.post('/orders', auth,orderController().store)
    app.get('/customer/orders', auth,orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)
  
   //admin routes
   app.get('/admin/orders', adminAuth,adminOrderController().index)

   //Admin routes status
   app.post('/admin/order/status', adminAuth, statusController().update)

 
   app.get('/about-dev',developer().index)

   
 }

 module.exports=initRoutes;