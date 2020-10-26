import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';
import { useRomaneio } from "../RomaneioProvider";


const getDataFormat = (data) => {
  let dataAux = new Date(data);
  return `${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()}`
}

function RomaneiosList() {
  const history = useHistory()
  const { romaneios, setRomaneio } = useRomaneio();

  const handleClick = e => {

    setRomaneio(e);
    history.push(`/order/`)
  }
  return (
    <div className="romaneio-list">
      {
        romaneios.map((element) => (
          <li key={element.id} onClick={_ => handleClick(element)}> {element.title} {getDataFormat(element.date)}</li>
        ))
      }
    </div >
  );
}

export default RomaneiosList;