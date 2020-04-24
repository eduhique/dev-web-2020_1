import React, { useState, useEffect } from 'react';
import api from '../services/Api';
import Loading from '../Componentes/Loading'
import { Link } from 'react-router-dom'

function getDataFormat(data) {
  let dataAux = new Date(data);
  return `${dataAux.getUTCDate()}/${dataAux.getUTCMonth()}/${dataAux.getUTCFullYear()}`
}

function Romaneios() {
  const [romaneios, setRomaneios] = useState();

  useEffect(_ => {
    async function getData() {
      let response = await api.get('romaneio/');
      setRomaneios(response.data);
    }
    getData();
  }, [setRomaneios])


  return (
    <div>
      {romaneios === undefined ? <Loading /> :
        <div className="romaneio">
          {
            romaneios.map((e) => (
              <li key={e.id}><Link to={`/resume/${e.id}`} >{e.title} {getDataFormat(e.date)}</Link></li>
            ))
          }
        </div>
      }
    </div>
  );

}

export default Romaneios;