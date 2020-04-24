import React from 'react';
import './App.css';
import Resume from './Resume';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Romaneios from './Romaneios';
import ResumeProduct from './ResumeProduct';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/romaneio/" component={Romaneios} />
          <Route exact path="/resume/product/" component={ResumeProduct} />
          <Route exact path="/resume/:resume" component={Resume} />
        </Switch>
      </ BrowserRouter>
    </div>
  );
}

export default App;
