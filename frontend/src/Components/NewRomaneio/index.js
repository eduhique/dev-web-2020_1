import React, { useState } from 'react';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
// import { Link } from 'react-router-dom';
import './style.scss';
import Calendar from '../Calendar';

function NewRomaneio({ onSubmit }) {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [dateAtual] = useState(new Date());
  const [loading, setLoading] = useState(false);

  var handleSubmit = async event => {
    event.preventDefault();
    setLoading(true)
    await api.post('romaneio/', { title, date, dateAtual: dateAtual.toJSON().substring(0, 10) })
      .then(response => onSubmit(response.data))
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
          <input type="text" id="romaneio" name="romaneio" placeholder="Opcional" onChange={handleChange} />
          </label>
          <label>
            data:
            <Calendar onChange={handleChangeData} />
          </label>
          <input type="submit" value="Cadastrar"></input>
        </form>
      }
    </div>
  );
}

export default NewRomaneio;