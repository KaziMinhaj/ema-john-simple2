import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom'


const Product = (props) => {
    document.title = 'Products'
    const { name, img, seller, price, stock, key } = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4><Link to={'/product/' + key}>{name}</Link> </h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock. Order soon</small></p>
                {
                    props.showAddToCart && <button onClick={() => props.handleAddProduct(props.product)} className="main-button">add to cart</button>
                }
            </div>

        </div>
    );
};

export default Product;