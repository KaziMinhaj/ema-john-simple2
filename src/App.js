import React from 'react'
import Header from './components/Header/Header'
import Shop from './components/Shop/Shop'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OrderReview from './components/OrderReview/OrderReview';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/PorductDetails/ProductDetails';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route exact path="/review">
            <OrderReview />
          </Route>
          <Route exact path="/inventory">
            <Inventory />
          </Route>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/product/:productKey" >
            <ProductDetails />
          </Route>
          <Route exact path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
