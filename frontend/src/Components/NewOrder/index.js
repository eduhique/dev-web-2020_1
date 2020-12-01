import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import api, { abort } from '../../services/Api';
import './style.scss';
import SelectSearch from '../SelectSearch';
import OrderList from '../OrderList';
import NewOrderItem from '../NewOrderItem'
import { useHistory } from 'react-router-dom';

const headers = {
  'Content-Type': 'application/json',
  'accept': "*/*"
}


function NewOrder(props) {
  const history = useHistory()
  const [client, setClient] = useState({});
  const [items, setItems] = useState([]);
  const [romaneioAtual, setRomaneioAtual] = useState({});
  const [loading, setLoading] = useState(false);

  function selectClient(client) {
    setClient(client);
  }

  async function searchClients(userInput) {
    let data = [];
    await api.get(`client/?s=${userInput}`).then(response => {
      data = response.data
    })
      .catch(response => data = []);
    return data;
  }

  var handleSubmit = async event => {
    event.preventDefault();

    if (client.id !== undefined && items.length > 0) {
      setLoading(true)

      let submit = { romaneioId: romaneioAtual.id, clientId: client.id, items: [] };
      items.forEach(element => {
        submit.items.push({ productId: element.productId, quantity: element.quantity });
      });

      await api.post('order/', submit, { headers: headers })
        .then(response => {
          setLoading(false);
          history.push(`/order/post/${romaneioAtual.id}`)
        })
        .catch(response => alert(response.data));

    } else {
      if (client.id === undefined) {
        alert("Selecionar um cliente!")
      }
      if (items.length <= 0) {
        alert("O pedido deve conter pelo menos 1 item.")
      }
    }
  }


  useEffect(_ => {
    async function getRomaneio() {
      let response = await api.get(`romaneio/${props.match.params.romaneio}`);
      setRomaneioAtual(response.data);
    }
    setLoading(true);
    getRomaneio()
    setLoading(false);
    document.getElementById('header-app').style.display = "none";

    return _ => {
      abort();
      document.getElementById('header-app').style.display = "grid";
    }
  }, [props.match.params.romaneio])

  return (
    <div>
      {loading ? <Loading /> : <div className="order-new">
        <div className="title">
          <h2>Criar Novo Pedido ({romaneioAtual.title})</h2>
        </div>
        <div className="actions">
          <input className="button-default green" type="button" value="Salvar" onClick={handleSubmit} />
          <input className="button-default" type="button" onClick={(e) => { history.push(`/order/`) }} value="Cancelar" />
        </div>
        <OrderList items={items} />
        <div className="product-order">
          <label className="label-order">
            <h3>Produto:</h3>
            <NewOrderItem items={items} setItems={setItems} productProps={{}} />
          </label>
          <label className="label-order">
            <h3>Cliente:</h3>
            <SelectSearch onSelect={selectClient} placeholder="Escreva o nome do cliente" modelName="Clientes" inputProperty="name" searchFunction={searchClients} />
            <div className="client-order-info">
              <h3>Tipo:</h3><p>{client.type}</p>
            </div>
          </label>
        </div>
      </div>}
    </div>
  );
}

export default NewOrder;