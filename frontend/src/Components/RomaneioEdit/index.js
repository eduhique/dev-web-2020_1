import React, { useState } from 'react';
import Loading from '../Loading'
import api from '../../services/Api';
import './style.scss';
import Calendar from '../Calendar';

function RomaneioEdit({ onSubmit, cancelEdit, ...props }) {
  const [id] = useState(props.id);
  const [title, setTitle] = useState(props.title);
  const [date, setDate] = useState(props.date)
  const [dateAtual] = useState(props.date);
  const [button, setButton] = useState(props.title && props.id > 0 ? false : true);
  const [loading, setLoading] = useState(false);

  const getDataFormat = (data) => {
    let dataAux = new Date(data);
    return `${dataAux.getFullYear()}-${dataAux.getMonth() > 8 ? dataAux.getMonth() + 1 : `0${dataAux.getMonth() + 1}`}-${dataAux.getDate() > 9 ? dataAux.getDate() : `0${dataAux.getDate()}`}`
  }

  var handleSubmit = async event => {
    event.preventDefault();
    console.log(date)
    setLoading(true)
    await api.put('romaneio/', { id, title: title.trim(), date: date, dateAtual }, { headers: { 'Content-Type': 'application/json', 'accept': "*/*" } })
      .then(_ => { onSubmit(true); })
      .catch(response => alert(response.data));
  }

  function handleChange(event) {
    let target = event.target;
    if (target.name === 'title') {
      setTitle(target.value);
      if (target.value.trim() !== "") {
        setButton(false)
      } else {
        setButton(true)
      }
    }
    if (target.name === 'date') {
      setDate(target.value);
    }
  }

  function handleChangeData(data) {
    setDate(data);
  }

  const deleteItem = async e => {
    setLoading(true)
    await api.delete(`romaneio/${id}`)
      .then(_ => { onSubmit(true); })
      .catch(response => alert(response.data));
  }

  return (
    <div>
      {loading ? <Loading /> : <div className="romaneio-item">
        <div className="romaneio-name">
          <input type="text" name="title" placeholder="Digite um titulo" onChange={handleChange} value={title} />
        </div>
        <div className="romaneio-other">
          <div className="container">
            <Calendar onChange={handleChangeData} dateFunction={getDataFormat} dateProps={date} />
          </div>
          <div className="romaneio-edit">
            <input type="button" disabled={button} value="S" onClick={handleSubmit} />
            <input type="button" value="C" onClick={cancelEdit} />
            <input type="button" onClick={(e) => { if (window.confirm(`Deseja realmente deletar o romaneio ${title}?`)) deleteItem(e) }} value="D" />
          </div>
        </div>
      </div>}
    </div>
  );
}

export default RomaneioEdit;