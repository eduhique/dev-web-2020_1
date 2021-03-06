import React from 'react';
import './App.scss';
import Report from './pages/Report';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Romaneios from './pages/Romaneios';
import ReportProduct from './pages/ReportProduct';
import Products from './pages/Products';
import Clients from './pages/Clients';
import Orders from './pages/Orders';
import NewOrder from './Components/NewOrder';
import PostOrder from './Components/PostOrder';
import NavBar from './Components/NavBar';
import RomaneioProvider from "./Components/RomaneioProvider";
import OrderEdit from './Components/OrderEdit';
import SearchBarResult from './Components/SearchBarResult';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RomaneioProvider>
          <NavBar />
          <div className="body-app">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/search" component={SearchBarResult} />
              <Route exact path="/romaneio/" component={Romaneios} />
              <Route exact path="/report/product/" component={ReportProduct} />
              <Route exact path="/report/:report" component={Report} />
              <Route exact path="/product/" component={Products} />
              <Route exact path="/client/" component={Clients} />
              <Route exact path="/order/new/:romaneio" component={NewOrder} />
              <Route exact path="/order/edit/:order" component={OrderEdit} />
              <Route exact path="/order/" component={Orders} />
              <Route exact path="/order/post/:romaneio" component={PostOrder} />
            </Switch>
          </div>
        </RomaneioProvider>
      </ BrowserRouter>
    </div>
  );
}

export default App;
