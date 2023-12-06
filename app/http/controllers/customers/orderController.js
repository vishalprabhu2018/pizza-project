const Order=require('../../../models/order')
const moment=require('moment');


function orderController(){
    return{
        store(req, res){
            //validate request
            const{phone,address}=req.body;

            if(!phone || !address){
                req.flash('error','All fields are required');
                return res.redirect('/cart')
            }
          
            const order=new Order({
                customerId:req.user._id,             
                items:req.session.cart.items,
                phone,
                address,
            })
            order.save()
            .then((result)=>{
                console.log(result);
                req.flash('success','Order placed Successfully')
                 return res.redirect('/')
            })
            .catch((err)=>{
                req.flash('error','something went wrong')
                return res.redirect('/cart')
            })
        },
       async index(req,res){
            const orders=await Order.find({customerId:req.user._id})
            res.render('customers/orders',{orders, moment})
            
        }
    }
}

module.exports=orderController