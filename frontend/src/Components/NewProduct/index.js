import React, { useState } from 'react';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
// import { Link } from 'react-router-dom'

function NewProduto({ onSubmit }) {
  const [nome, setNome] = useState();
  const [unidade, setUnidade] = useState('cx');
  const [botao, setBotao] = useState(true);
  const [loading, setLoading] = useState(false);

  var handleSubmit = async event => {
    event.preventDefault();
    setLoading(true)
    let response = await api.post('produto/', { nome, unidade }).catch(error => {
      alert(error.data.message);
    });
    onSubmit(response.data);
    setLoading(false);
  }

  function handleChange(event) {
    let target = event.target;
    if (target.name === 'produto') {
      setNome(target.value);
      if (target.value.trim() !== "") {
        setBotao(false)
      } else {
        setBotao(true)
      }
    }
    if (target.name === 'unidade') {
      setUnidade(target.value);
    }
  }

  return (
    <div className="produto-form">
      {loading ? <Loading /> :
        <form className="produto-form" onSubmit={handleSubmit}>
          <label>
            Nome:
          <input type="text" name="produto" placeholder="ex. Manga Tommy" onChange={handleChange} />
          </label>
          <label>
            Unidade:
            <select value={unidade} name="unidade" onChange={handleChange}>
              <option value="cx">Caixa</option>
              <option value="kg">Quilo</option>
              <option value="und">Unidade</option>
            </select>
          </label>
          <input type="submit" disabled={botao} value="Cadastrar"></input>
        </form>
      }
    </div>
  );
}

export default NewProduto;