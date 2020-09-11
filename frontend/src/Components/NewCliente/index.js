import React, { useState } from 'react';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
// import { Link } from 'react-router-dom';
import './style.scss';

function NewCliente({ onSubmit }) {
  const [nome, setNome] = useState();
  const [tipo, setTipo] = useState('Varejo');
  const [botao, setBotao] = useState(true);
  const [loading, setLoading] = useState(false);
  const headers = {
    'Content-Type': 'application/json',
    'accept': "*/*"
  }

  var handleSubmit = async event => {
    event.preventDefault();
    setLoading(true)
    await api.post('cliente/', { nome, tipo }, { headers: headers })
      .then(response => onSubmit(response.data))
      .catch(response => alert(response.data));
    setLoading(false);
  }

  function handleChange(event) {
    let target = event.target;
    if (target.name === 'cliente') {
      setNome(target.value);
      if (target.name.trim() !== "") {
        setBotao(false)
      } else {
        setBotao(true)
      }
    }
    if (target.name === 'tipo') {
      setTipo(target.value);
    }
  }

  return (
    <div className="cliente-form">
      {loading ? <Loading /> :
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
          <input type="text" id="cliente" name="cliente" placeholder="Supermercado de teste" onChange={handleChange} />
          </label>
          <label>
            tipo:
            <select value={tipo} name="tipo" onChange={handleChange}>
              <option value="Varejo">Varejo</option>
              <option value="Atacado">Atacado</option>
            </select>
          </label>
          <input type="submit" disabled={botao} value="Cadastrar"></input>
        </form>
      }
    </div>
  );
}

export default NewCliente;