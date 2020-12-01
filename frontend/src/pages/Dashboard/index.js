import React from 'react';
import {
  Link
} from 'react-router-dom';
import './style.scss';


function Dashboard() {
  return (
    <div className="dashboard">
      <ul>
        <li className="button-default"><Link to="/romaneio/" >Romaneios</Link></li>
        <li className="button-default"><Link to="/product/" >Produtos</Link></li>
        <li className="button-default"><Link to="/client/" >Clientes</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;