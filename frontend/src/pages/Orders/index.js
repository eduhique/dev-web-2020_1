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
  const [sort, setSort] = useState('NONE');

  useEffect(_ => {
    const compare = (a, b) => {
      let split = sort.split("/");
      if (split[0] === "NAME" || (split[0] === "VOL" && ((a.subCaixas !== undefined ? a.subCaixas : 0) + (a.subQuilos !== undefined ? a.subQuilos : 0) + (a.subUnits !== undefined ? a.subUnits : 0)) === ((b.subCaixas !== undefined ? b.subCaixas : 0) + (b.subQuilos !== undefined ? b.subQuilos : 0) + (b.subUnits !== undefined ? b.subUnits : 0)))) {
        if (split[1] === "ASC") {
          return ((a.client.name.toUpperCase().trim() < b.client.name.toUpperCase().trim()) ? -1 : ((a.client.name.toUpperCase().trim() > b.client.name.toUpperCase().trim()) ? 1 : 0));
        } else if (split[1] === "DSC") {
          return ((b.client.name.toUpperCase().trim() < a.client.name.toUpperCase().trim()) ? -1 : ((b.client.name.toUpperCase().trim() > a.client.name.toUpperCase().trim()) ? 1 : 0));
        }
      } else if (split[0] === "VOL") {
        if (split[1] === "ASC") {
          return ((a.subCaixas !== undefined ? a.subCaixas : 0) + (a.subQuilos !== undefined ? a.subQuilos : 0) + (a.subUnits !== undefined ? a.subUnits : 0)) - ((b.subCaixas !== undefined ? b.subCaixas : 0) + (b.subQuilos !== undefined ? b.subQuilos : 0) + (b.subUnits !== undefined ? b.subUnits : 0));
        } else if (split[1] === "DSC") {
          return ((b.subCaixas !== undefined ? b.subCaixas : 0) + (b.subQuilos !== undefined ? b.subQuilos : 0) + (b.subUnits !== undefined ? b.subUnits : 0)) - ((a.subCaixas !== undefined ? a.subCaixas : 0) + (a.subQuilos !== undefined ? a.subQuilos : 0) + (a.subUnits !== undefined ? a.subUnits : 0));
        }
      }
    }
    async function getData() {
      let response = await api.get(`order/romaneio/${romaneio.id}`);
      let orderss = response.data;
      orderss.sort(compare)
      if (sort !== "NONE" && sort !== "Date/ASC") {
        setOrders(orderss.sort(compare));
      }
      if (sort === "NONE") {
        setOrders(orderss);
      }
      if (sort === "NONE") {
        setOrders(orderss.reverse());
      }
    }

    setLoading(true);
    if (romaneio.id !== undefined) {
      getData();
    }
    setLoading(false);

  }, [setOrders, romaneio.id, loading, sort])

  return (
    <div>
      {loading ? <Loading /> :
        <div className="orders">
          <div className="title"><h2>{romaneio.title}</h2></div>
          <div className="data"><h2>({getDataFormat(romaneio.date)})</h2></div>
          <div className="actions container">
            <div><p className="button-default"><Link to={`/report/${romaneio.id}`} >Relatório</Link></p></div>
            <div><p className="button-default"><Link to={`/order/new/${romaneio.id}`} >Novo Pedido</Link></p></div>
            <div>
              <p>Ordenar por:</p>
              <select value={sort} name="type" onChange={event => setSort(event.target.value)}>
                <option value="NONE"> Criação (decrescente)</option>
                <option value="Date/ASC"> Criação (crescente)</option>
                <option value="NAME/ASC">Cliente (A a Z)</option>
                <option value="NAME/DSC">Cliente (Z a A)</option>
                <option value="VOL/ASC">Volume (crescente)</option>
                <option value="VOL/DSC">Volume (crescente)</option>
              </select>
            </div>
          </div>
          <br />

          <div className="order-list">
            <hr />
            {
              orders.map((element) => (
                <OrderItem order={element} key={element.id} onSubmit={e => { setLoading(true); }} />
              ))
            }
          </div>
        </div>
      }
    </div>
  );
}

export default Orders;