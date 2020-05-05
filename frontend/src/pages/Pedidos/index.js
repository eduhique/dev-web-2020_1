import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import { Link } from 'react-router-dom'
import api from '../../services/Api';
import './style.css';
import PedidoItem from '../../Components/PedidoItem';

function getDataFormat(data) {
  let dataAux = new Date(data);
  return `${dataAux.getUTCDate()}/${dataAux.getUTCMonth() + 1}/${dataAux.getUTCFullYear()}`
}

function Pedidos(props) {
  const [pedidos, setPedidos] = useState();
  const romaneioId = props.match.params.romaneio;

  useEffect(_ => {
    async function getData() {
      let response = await api.get('pedido/romaneio/' + romaneioId);
      setPedidos(response.data);
    }
    getData();
  }, [romaneioId, setPedidos])

  return (
    <div>
      {pedidos === undefined ? <Loading /> :
        <div className="pedidos">
          <div className="romaneio-title"><h2>{pedidos[0].romaneio.title}</h2></div>
          <div className="romaneio-data"><h2>{getDataFormat(pedidos[0].romaneio.date)}</h2></div>
          <p><Link to={`/resume/${pedidos[0].romaneio.id}`} >Relatório</Link></p>
          <br />
          <h3>Pedidos:</h3>
          <div className="pedido-list">
            <hr />
            {
              pedidos.map((element) => (
                <PedidoItem pedido={element} />
              ))
            }
          </div>
        </div>
      }
    </div>
  );
}

export default Pedidos;