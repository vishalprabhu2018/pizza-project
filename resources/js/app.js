import axios from 'axios';
import Noty from 'noty'
const addToCart = document.querySelectorAll('.add-to-cart');
const cartCounter=document.getElementById('cartCounter');

function updateCart(pizza){
     axios.post('/update-cart',pizza).then(res=>{
        cartCounter.innerText=res.data.totalQty;
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
            // layout:'bottomLeft'
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        }).show();
     }).catch((error)=>{console.log(error)});
}


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})