import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
import { Link } from 'react-router-dom';
import './style.css';
import NewRomaneio from '../../Components/NewRomaneio';


function getDataFormat(data) {
  let dataAux = new Date(data);
  return `${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()}`
}

function Romaneios() {
  const [romaneios, setRomaneios] = useState([]);
  const [loading, setLoading] = useState(false);


  async function addRomaneio(romaneio) {
    setLoading(true);
    await romaneios.push(romaneio);
    setLoading(false);
  }

  useEffect(_ => {
    async function getData() {
      let response = await api.get('romaneio/');
      setRomaneios(response.data);
    }
    getData();
  }, [setRomaneios])


  return (
    <div>
      <div><h3>Romaneios</h3></div>
      <NewRomaneio onSubmit={addRomaneio} />
      {loading ? <Loading /> :
        <div className="romaneio">
          {
            romaneios.map((e) => (
              <li key={e.id}><Link to={`/pedido/${e.id}`} >{e.title} {getDataFormat(e.date)}</Link></li>
            ))
          }
        </div>
      }
    </div>
  );

}

export default Romaneios;