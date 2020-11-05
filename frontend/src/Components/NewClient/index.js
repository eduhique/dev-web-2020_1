import React, { useState } from 'react';
import Loading from '../Loading'
import api from '../../services/Api';
// import { Link } from 'react-router-dom';
import './style.scss';

function NewClient({ onSubmit }) {
  const [name, setName] = useState();
  const [type, setType] = useState('Varejo');
  const [button, setButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const headers = {
    'Content-Type': 'application/json',
    'accept': "*/*"
  }

  var handleSubmit = async event => {
    event.preventDefault();
    setLoading(true)
    await api.post('client/', { name: name.trim(), type }, { headers: headers })
      .then(response => onSubmit(response.data))
      .catch(response => alert(response.data));
    setLoading(false);
  }

  function handleChange(event) {
    let target = event.target;
    if (target.name === 'client') {
      setName(target.value);
      if (target.value.trim() !== "") {
        setButton(false)
      } else {
        setButton(true)
      }
    }
    if (target.name === 'type') {
      setType(target.value);
    }
  }

  return (
    <div className="client-form">
      {loading ? <Loading /> :
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
          <input type="text" id="client" name="client" placeholder="Supermercado de teste" onChange={handleChange} />
          </label>
          <label>
            type:
            <select value={type} name="type" onChange={handleChange}>
              <option value="Varejo">Varejo</option>
              <option value="Atacado">Atacado</option>
            </select>
          </label>
          <input type="submit" disabled={button} value="Cadastrar"></input>
        </form>
      }
    </div>
  );
}

export default NewClient;