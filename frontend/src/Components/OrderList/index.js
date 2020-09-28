import React from 'react';
import './style.scss';


function OrderList({ items }) {

  return (
    <div className="list-newOrder">
      <table>
        <tbody>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Unidade</th>
            <th>Ações</th>
          </tr>
          {
            items.length > 0 ? items.map((element) => (
              <tr key={element.productId}>
                <td className="colum-order-item" >{element.product.name}</td>
                <td className="colum-order-item" id="colum-order-qtd">{element.quantity}</td>
                <td className="colum-order-item" id="colum-order-qtd">{element.product.unit}</td>
                <td className="colum-order-item" id="colum-order-action">nada</td>
              </tr>
            )) : null
          }
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;