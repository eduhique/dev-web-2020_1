import React, { useState } from 'react';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
// import { Link } from 'react-router-dom';
import './style.scss';

function NewProduct({ onSubmit }) {
  const [name, setName] = useState();
  const [unit, setUnit] = useState('cx');
  const [button, setButton] = useState(true);
  const [loading, setLoading] = useState(false);

  var handleSubmit = async event => {
    event.preventDefault();
    setLoading(true)
    let response = await api.post('product/', { name: name.trim(), unit }).catch(error => {
      alert(error.data.message);
    });
    onSubmit(response.data);
    setLoading(false);
  }

  function handleChange(event) {
    let target = event.target;
    if (target.name === 'product') {
      setName(target.value);
      if (target.value.trim() !== "") {
        setButton(false)
      } else {
        setButton(true)
      }
    }
    if (target.name === 'unit') {
      setUnit(target.value);
    }
  }

  return (
    <div className="product-form">
      {loading ? <Loading /> :
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
          <input type="text" name="product" placeholder="ex. Manga Tommy" onChange={handleChange} />
          </label>
          <label>
            Unit:
            <select value={unit} name="unit" onChange={handleChange}>
              <option value="cx">Caixa</option>
              <option value="kg">Quilo</option>
              <option value="und">Unidade</option>
            </select>
          </label>
          <input type="submit" disabled={button} value="Cadastrar"></input>
        </form>
      }
    </div>
  );
}

export default NewProduct;