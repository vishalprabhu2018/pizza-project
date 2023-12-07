const Order=require('../../../models/order')
function orderController(){
    return{
     index(req,res){
          Order.find({status:{$ne:'completed'}}, null ,{sort:{'createdAt':-1}})
          .populate('customerId','-password')
          .then((orders) => {
            if(req.xhr){
                return res.json(orders);
            }
            else{
           res.render('admin/orders')
            }
          }).catch((err) => {
            console.log(err)
          });
         
          //populate will give full user object there 
     }
    }
}


module.exports=orderController;