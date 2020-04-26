import React from 'react';
import './App.css';
import Resume from './pages/Resume';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Romaneios from './pages/Romaneios';
import ResumeProduct from './pages/ResumeProduct';
import Produtos from './pages/Produtos';
import Clientes from './pages/Clientes';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/romaneio/" component={Romaneios} />
          <Route exact path="/resume/product/" component={ResumeProduct} />
          <Route exact path="/resume/:resume" component={Resume} />
          <Route exact path="/produto/" component={Produtos} />
          <Route exact path="/cliente/" component={Clientes} />
        </Switch>
      </ BrowserRouter>
    </div>
  );
}

export default App;
