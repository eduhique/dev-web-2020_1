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
  const [sort, setSort] = useState('NONE');
  const [modeEdit, setModeEdit] = useState(false)

  async function addClient(client) {
    setLoading(true);
  }

  useEffect(_ => {
    const compare = (a, b) => {
      let split = sort.split("/");
      if (split[0] === "NAME" || (split[0] === "TYPE" && a.type.toUpperCase().trim() === b.type.toUpperCase().trim())) {
        if (split[1] === "ASC") {
          return ((a.name.toUpperCase().trim() < b.name.toUpperCase().trim()) ? -1 : ((a.name.toUpperCase().trim() > b.name.toUpperCase().trim()) ? 1 : 0));
        } else if (split[1] === "DSC") {
          return ((b.name.toUpperCase().trim() < a.name.toUpperCase().trim()) ? -1 : ((b.name.toUpperCase().trim() > a.name.toUpperCase().trim()) ? 1 : 0));
        }
      } else if (split[0] === "TYPE") {
        if (split[1] === "ASC") {
          return ((a.type.toUpperCase().trim() < b.type.toUpperCase().trim()) ? -1 : ((a.type.toUpperCase().trim() > b.type.toUpperCase().trim()) ? 1 : 0));
        } else if (split[1] === "DSC") {
          return ((b.type.toUpperCase().trim() < a.type.toUpperCase().trim()) ? -1 : ((b.type.toUpperCase().trim() > a.type.toUpperCase().trim()) ? 1 : 0));
        }
      }
    }
    async function getData() {
      let response = await api.get('client/');
      let clients = response.data;
      clients.sort(compare)
      setClients(sort === "NONE" ? clients : clients.sort(compare));
    }
    setLoading(true);
    getData();
    setLoading(false)
  }, [setClients, loading, sort])


  return (
    <div>
      <div className="client-title"><h1>Clientes</h1></div>
      <NewClient onSubmit={addClient} />
      <div className="actions container">
        <div>
          <p>Ordenar por:</p>
          <select value={sort} disabled={modeEdit} name="type" onChange={event => setSort(event.target.value)}>
            <option value="NONE">Relevância</option>
            <option value="NAME/ASC">Nome (A a Z)</option>
            <option value="NAME/DSC">Nome (Z a A)</option>
            <option value="TYPE/ASC">Tipo (A a Z)</option>
            <option value="TYPE/DSC">Tipo (Z a A)</option>
          </select>
        </div>
      </div>
      {loading ? <Loading /> :
        <ClientsList clients={clients} setLoading={setLoading} modeEdit={modeEdit} setModeEdit={setModeEdit} />
      }
    </div>
  );

}

export default Clients;