import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRomaneio } from '../RomaneioProvider';
import './style.scss'

function RomaneioItemSearch(props) {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const { setRomaneio } = useRomaneio();

  const getDataFormat = (data) => {
    let dataAux = new Date(data);
    return `${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()}`
  }

  const handleClick = _ => {
    setRomaneio({ id: props.id, title: props.title, date: props.date });
    history.push(`/order/`)
  }

  useEffect(_ => {
    setTitle(props.title);
    setDate(props.date);
  }, [props.title, props.date])

  return (
    <div className="romaneio-item clickElement" onClick={_ => { handleClick() }}>
      <div className="romaneio-name">
        <p>{title}</p>
      </div>
      <div className="romaneio-other">
        <div className="type-algn">
          <p>{getDataFormat(date)}</p>
        </div>
      </div>
    </div >

  );
}

export default RomaneioItemSearch;