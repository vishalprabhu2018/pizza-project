const Order=require('../../../models/order')

function statusController(){
    return{
        update(req,res){
            Order.updateOne({_id:req.body.orderId},{status:req.body.status})
            .then(()=>{
                //Emit Event
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })
                return res.redirect('/admin/orders')
            })
            .catch((error)=>{
                return res.redirect('/admin/orders')
            })
        }
    }
}

module.exports=statusController;