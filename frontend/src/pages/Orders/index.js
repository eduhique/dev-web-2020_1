import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import { Link } from 'react-router-dom'
import api from '../../services/Api';
import './style.scss';
import OrderItem from '../../Components/OrderItem';
import { useRomaneio } from "../../Components/RomaneioProvider";


const getDataFormat = (data) => {
  let dataAux = new Date(data);
  return `${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()}`
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { romaneio } = useRomaneio();

  useEffect(_ => {
    async function getData() {
      let response = await api.get(`order/romaneio/${romaneio.id}`);
      setOrders(response.data);
    }

    setLoading(true);
    if (romaneio.id !== undefined) {
      getData();
    }
    setLoading(false);

  }, [setOrders, romaneio.id])

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