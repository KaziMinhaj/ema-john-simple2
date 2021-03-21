import React, { createContext, useState } from 'react'
import Header from './components/Header/Header'
import Shop from './components/Shop/Shop'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import OrderReview from './components/OrderReview/OrderReview';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/PorductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <h3> login: {loggedInUser.email}</h3>
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
          <Route path="/shipment" >
            <Shipment></Shipment>
          </Route>
          <Route path="/login" >
            <Login></Login>
          </Route>
          <Route exact path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
