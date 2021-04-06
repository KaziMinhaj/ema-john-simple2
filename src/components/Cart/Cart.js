import React from 'react';


const Cart = (props) => {

    const cart = props.cart;
    // const total = cart.reduce((total, prod) => (total + prod.price), 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
    }
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 10) {
        shipping = 12.99;
    }
    const tax = (total / 10);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Items: {cart.length}</h5>
            <p> Product price: {formatNumber(total)}</p>
            <h5><small>Shipping cost:{shipping.toFixed(2)}</small></h5>
            <h5><small>Tax: {formatNumber(tax)}</small></h5>
            <h5>Total price:{grandTotal}</h5>
            {
                props.children
            }
        </div>
    );
};
export default Cart;