import React, { useState } from 'react';
import Loading from '../Loading'
import api from '../../services/Api';
import './style.scss';

function ClientEdit({ onSubmit, cancelEdit, ...props }) {
  const [id] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [type, setType] = useState(props.type)
  const [button, setButton] = useState(props.name && props.id > 0 ? false : true);
  const [loading, setLoading] = useState(false);

  var handleSubmit = async event => {
    event.preventDefault();
    setLoading(true)
    await api.put('client/', { id, name: name.trim(), type }, { headers: { 'Content-Type': 'application/json', 'accept': "*/*" } })
      .then(_ => { onSubmit(true); })
      .catch(response => alert(response.data));
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

  const deleteItem = async e => {
    e.preventDefault();
    setLoading(true)
    await api.delete(`client/${id}`)
      .then(_ => { onSubmit(true); })
      .catch(response => alert(response.data));
  }

  return (
    <div>
      {loading ? <Loading /> : <form onSubmit={handleSubmit} className="client-item">
        <div className="client-name">
          <input type="text" name="client" placeholder="Supermercado de teste" onChange={handleChange} value={name} />
        </div>
        <div className="client-other">
          <div className="container">
            <select value={type} name="type" onChange={handleChange}>
              <option value="Varejo">Varejo</option>
              <option value="Atacado">Atacado</option>
            </select>
          </div>
          <div className="client-edit">
            <input type="submit" disabled={button} value="S" />
            <input type="button" value="C" onClick={cancelEdit} />
            <input type="button" onClick={(e) => { if (window.confirm(`Deseja realmente deletar ${name}?`)) deleteItem(e) }} value="D" />
          </div>
        </div>
      </form>}
    </div>
  );
}

export default ClientEdit;