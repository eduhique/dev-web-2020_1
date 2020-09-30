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

    return _ => abort();
  }, [props.match.params.romaneio])

  return (
    <div>
      {loading ? <Loading /> : <div>
        <div>
          <h2>Criar Novo Pedido ({romaneioAtual.title})</h2>
          <input type="button" value="Salvar" onClick={handleSubmit} />
        </div>
        <br />
        <OrderList items={items} />
        <br />
        <hr />
        <hr />
        <div>
          <label>
            <h3>Produto:</h3>
            <NewOrderItem items={items} setItems={setItems} productProps={{}} />
          </label>
          <hr />
          <label>
            <h3>Cliente:</h3>
            <SelectSearch onSelect={selectClient} placeholder="Escreve o nome do cliente" modelName="Clientes" inputProperty="name" searchFunction={searchClients} />
          </label>
          <label>
            <h3>Tipo:</h3><p>{client.type}</p>
          </label>
        </div>
        <hr />
      </div>}
    </div>
  );
}

export default NewOrder;