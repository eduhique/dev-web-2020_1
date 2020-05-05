import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


function getDataFormat(data) {
  let dataAux = new Date(data);
  return `${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()}`
}

function RomaneiosList({ romaneios }) {
  return (
    <div className="romaneio">
      {
        romaneios.map((e) => (
          <li key={e.id}><Link to={`/pedido/${e.id}`} >{e.title} {getDataFormat(e.date)}</Link></li>
        ))
      }
    </div>
  );
}

export default RomaneiosList;