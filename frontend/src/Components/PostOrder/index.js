import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import api from '../../services/Api';
import './style.scss';
import { useHistory } from 'react-router-dom';


function PostOrder(props) {
  const history = useHistory()
  const [romaneios, setRomaneios] = useState([]);
  const [romaneioId, setRomaneioId] = useState(props.match.params.romaneio);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    let target = e.target;
    setRomaneioId(target.value);
  }

  useEffect(_ => {
    async function getRomaneios() {
      let response = await api.get(`romaneio/`);
      setRomaneios(response.data);
    }
    setLoading(true);
    getRomaneios()
    setLoading(false);
    document.getElementById('header-app').style.display = "none";

    return _ => {
      document.getElementById('header-app').style.display = "grid";
    }
  }, [])

  return (
    <div>
      <h1>Pedido realizado com sucesso!</h1>
      <h3>Deseja fazer um novo pedido?</h3>
      {loading ? <Loading /> : <div>
        <select value={romaneioId} name="romaneios" onChange={handleChange}>
          {
            romaneios.map((e) => (
              <option key={e.id} value={e.id}>{e.title}</option>
            ))
          }
        </select>
        <input type="button" value="Novo Pedido" onClick={_ => history.push(`/order/new/${romaneioId}`)} />
        <input type="button" value="Pedidos" onClick={_ => history.push(`/order/`)} />
      </div>}
    </div>
  );
}

export default PostOrder;