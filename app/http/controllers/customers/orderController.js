const Order=require('../../../models/order')
const moment=require('moment');
const { findById } = require('../../../models/user');


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
                delete req.session.cart;
                req.flash('success','Order placed Successfully')
                 return res.redirect('/customer/orders')
            })
            .catch((err)=>{
                req.flash('error','something went wrong')
                return res.redirect('/cart')
            })
        },
       async index(req,res){
            const orders=await Order.find({customerId:req.user._id},null,{sort:{createdAt:-1}})  //descending sorting
            res.render('customers/orders',{orders, moment})
            
        },
        async show(req,res){
            const order=await Order.findById(req.params.id);
            if(req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/singleOrder', { order })
            }
            return  res.redirect('/')
        
        }

    }
}

module.exports=orderController