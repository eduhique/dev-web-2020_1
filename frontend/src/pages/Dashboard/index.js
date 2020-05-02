import React from 'react';
import {
  Link
} from 'react-router-dom';
import './style.css';


function Dashboard() {
  return (
    <div className="dashboard">
      <ul>
        <li><Link to="/romaneio/" >Romaneios</Link></li>
        <li><Link to="/produto/" >Produtos</Link></li>
        <li><Link to="/cliente/" >Clientes</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;