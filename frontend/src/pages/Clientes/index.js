import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
import './style.css'
import NewCliente from '../../Components/NewCliente';
import ClientesList from '../../Components/ClienteList';
// import { Link } from 'react-router-dom';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function addCliente(cliente) {
    setLoading(true);
    await clientes.push(cliente);
    setLoading(false);
  }

  useEffect(_ => {
    async function getData() {
      let response = await api.get('cliente/');
      setClientes(response.data);
    }
    getData();
  }, [setClientes])


  return (
    <div>
      <div className="cliente-title"><h1>Clientes</h1></div>
      <NewCliente onSubmit={addCliente} />
      {loading ? <Loading /> :
        <ClientesList clientes={clientes} />
      }
    </div>
  );

}

export default Clientes;