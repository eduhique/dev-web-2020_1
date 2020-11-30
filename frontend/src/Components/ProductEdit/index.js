import React, { useState } from 'react';
import Loading from '../Loading'
import api from '../../services/Api';
import './style.scss';

function ProductEdit({ onSubmit, cancelEdit, ...props }) {
  const [id] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [unit, setUnit] = useState(props.unit)
  const [button, setButton] = useState(props.name && props.id > 0 ? false : true);
  const [loading, setLoading] = useState(false);

  var handleSubmit = async event => {
    event.preventDefault();
    setLoading(true)
    await api.put('product/', { id, name: name.trim(), unit }, { headers: { 'Content-Type': 'application/json', 'accept': "*/*" } })
      .then(_ => { onSubmit(true); })
      .catch(response => alert(response.data));
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

  const deleteItem = async e => {
    setLoading(true)
    await api.delete(`product/${id}`)
      .then(_ => { onSubmit(true); })
      .catch(response => alert(response.data));
  }

  return (
    <div>
      {loading ? <Loading /> : <form onSubmit={handleSubmit} className="product-item">
        <div className="product-name">
          <input type="text" name="product" placeholder="Abacaxi" onChange={handleChange} value={name} />
        </div>
        <div className="product-other">
          <div className="container">
            <select value={unit} name="unit" onChange={handleChange}>
              <option value="cx">Caixa</option>
              <option value="kg">Quilo</option>
              <option value="und">Unidade</option>
            </select>
          </div>
          <div className="product-edit">
            <input type="submit" disabled={button} value="S" />
            <input type="button" value="C" onClick={cancelEdit} />
            <input type="button" onClick={(e) => { if (window.confirm(`Deseja realmente deletar ${name}?`)) deleteItem(e) }} value="D" />
          </div>
        </div>
      </form>}
    </div>
  );
}

export default ProductEdit;