import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReportTotais from '../ReportTotais'
import api from '../../services/Api';
import './style.scss';

function OrderItem({ order, onSubmit }) {
  const history = useHistory();
  const [id] = useState(order.id);

  const editMode = _ => {
    history.push(`/order/edit/${id}`)
  }

  const deleteItem = async e => {
    await api.delete(`order/${id}`)
      .then(_ => { onSubmit(true); })
      .catch(response => alert(response.data));
  }
  return (
    <div className="order">
      <div className="client-info">
        <p><b>Cliente:</b> {order.client.name}</p>
        <p><b>Tipo:</b>{order.client.type}</p>
      </div>
      <div className="actions-order">
        <input type="submit" onClick={(e) => { if (window.confirm(`Editar pedido de ${order.client.name}`)) editMode() }} value="Editar" />
        <input type="button" onClick={(e) => { if (window.confirm(`Deseja realmente deletar o pedido de ${order.client.name}?`)) deleteItem() }} value="Deletar" />
      </div>
      <br />
      <table>
        <tbody>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
          </tr>
          {order.items.map((e, i) => (
            <tr key={i}>
              <td className="colum-item" >{e.product.name}</td>
              <td className="colum-item" id="colum-qtd">{e.quantity} {e.product.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReportTotais subCaixas={order.subCaixas} subQuilos={order.subQuilos} subUnits={order.subUnits} />
      <hr />
      <br />
    </div>
  );
}

export default OrderItem;