import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
import './style.scss'
import NewClient from '../../Components/NewClient';
import ClientsList from '../../Components/ClientList';
// import { Link } from 'react-router-dom';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  async function addClient(client) {
    setLoading(true);
    await clients.push(client);
    setLoading(false);
  }

  useEffect(_ => {
    async function getData() {
      let response = await api.get('client/');
      setClients(response.data);
    }
    getData();
  }, [setClients])


  return (
    <div>
      <div className="client-title"><h1>Clients</h1></div>
      <NewClient onSubmit={addClient} />
      {loading ? <Loading /> :
        <ClientsList clients={clients} />
      }
    </div>
  );

}

export default Clients;