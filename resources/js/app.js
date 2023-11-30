import axios from 'axios'

const addToCart = document.querySelectorAll('.add-to-cart');
const cartCounter=document.getElementById('cartCounter');

function updateCart(pizza){
     axios.post('/update-cart',pizza).then(res=>{
        console.log(res)
        cartCounter.innerText=res.data.totalQty;
     }).catch((error)=>{console.log(error)});
}


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})