import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import { Link } from 'react-router-dom'
import api from '../../services/Api';
import './style.scss';
import OrderItem from '../../Components/OrderItem';

function getDataFormat(data) {
  let dataAux = new Date(data);
  return `${dataAux.getDate()}/${dataAux.getMonth() + 1}/${dataAux.getFullYear()}`
}

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [romaneio, setRomaneio] = useState({});
  const [loading, setLoading] = useState(false);
  const [romaneioId] = useState(props.match.params.romaneio);

  useEffect(_ => {
    async function getData() {
      let response = await api.get(`order/romaneio/${romaneioId}`);
      setOrders(response.data);
    }
    async function getRomaneio() {
      let response = await api.get(`/romaneio/${romaneioId}`);
      setRomaneio(response.data);
    }

    setLoading(true);
    getRomaneio();
    getData();
    setLoading(false);

  }, [romaneioId, setOrders])

  return (
    <div>
      {loading ? <Loading /> :
        <div className="orders">
          <div className="romaneio-title"><h2>{romaneio.title}</h2></div>
          <div className="romaneio-data"><h2>{getDataFormat(romaneio.date)}</h2></div>
          <p><Link to={`/report/${romaneio.id}`} >Relatório</Link></p>
          <p><Link to={`/order/new/${romaneio.id}`} >Novo Pedido</Link></p>
          <br />
          <h3>Pedidos:</h3>
          <div className="order-list">
            <hr />
            {
              orders.map((element) => (
                <OrderItem order={element} key={element.id} />
              ))
            }
          </div>
        </div>
      }
    </div>
  );
}

export default Orders;