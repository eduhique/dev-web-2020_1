import React from 'react';
import ReportTotais from '../ReportTotais'
import './style.scss';

function OrderItem({ order }) {
  return (
    <div className="order">
      <div className="client-info">
        <b>Cliente:</b> {order.client.name}
        <b>Tipo:</b>{order.client.type}
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