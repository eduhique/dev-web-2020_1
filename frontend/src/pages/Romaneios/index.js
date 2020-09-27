import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
import './style.scss';
import NewRomaneio from '../../Components/NewRomaneio';
import RomaneiosList from '../../Components/RomaneiosList';

function Romaneios() {
  const [romaneios, setRomaneios] = useState([]);
  const [loading, setLoading] = useState(false);


  async function addRomaneio() {
    setLoading(true);
  }

  useEffect(_ => {
    document.title = "Romaneios"
    async function getData() {
      let response = await api.get('romaneio/');
      setRomaneios(response.data);
    }
    setLoading(true);
    getData();
    setLoading(false);
  }, [setRomaneios, loading])


  return (
    <div>
      <div><h3>Romaneios</h3></div>
      <NewRomaneio onSubmit={addRomaneio} />
      {loading ? <Loading /> :
        <RomaneiosList romaneios={romaneios} />
      }
    </div>
  );
}

export default Romaneios;