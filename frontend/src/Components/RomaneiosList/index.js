import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';


const getDataFormat = (data) => {
  let dataAux = new Date(data);
  return `${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()}`
}

function RomaneiosList({ romaneios }) {
  return (
    <div className="romaneio-list">
      {
        romaneios.map((e) => (
          <li key={e.id}><Link to={`/order/${e.id}`} >{e.title} {getDataFormat(e.date)}</Link></li>
        ))
      }
    </div>
  );
}

export default RomaneiosList;