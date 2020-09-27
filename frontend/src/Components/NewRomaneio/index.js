import React, { useState } from 'react';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
// import { Link } from 'react-router-dom';
import './style.scss';
import Calendar from '../Calendar';

const getDataFormat = (data) => {
  let dataAux = new Date(data);
  return `${dataAux.getFullYear()}-${dataAux.getMonth() > 8 ? dataAux.getMonth() + 1 : `0${dataAux.getMonth() + 1}`}-${dataAux.getDate() > 9 ? dataAux.getDate() : `0${dataAux.getDate()}`}`
}

function NewRomaneio({ onSubmit }) {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [dateAtual] = useState(new Date());
  const [loading, setLoading] = useState(false);

  var handleSubmit = async event => {
    event.preventDefault();
    setLoading(true)
    await api.post('romaneio/', { title, date, dateAtual: getDataFormat(dateAtual) })
      .then(response => onSubmit())
      .catch(response => alert(response.data));
    setLoading(false);
  }

  function handleChange(event) {
    let target = event.target;
    setTitle(target.value);
  }

  function handleChangeData(data) {
    setDate(data);
  }

  return (
    <div className="romaneio-form">
      {loading ? <Loading /> :
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
          <input type="text" name="romaneio" placeholder="Opcional" onChange={handleChange} />
          </label>
          <label>
            data:
            <Calendar onChange={handleChangeData} dateFunction={getDataFormat} />
          </label>
          <input type="submit" value="Cadastrar"></input>
        </form>
      }
    </div>
  );
}

export default NewRomaneio;