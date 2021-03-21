import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Inventory</Link>
            </nav>
        </div>
    );
};

export default Header;