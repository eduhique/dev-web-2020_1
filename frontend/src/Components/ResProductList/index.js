import React from 'react';
import './style.scss'

function ResProductList(props) {
  return (
    <div className="report-list">
      <table>
        <tbody>
          <tr>
            <th>Cliente</th>
            <th>Quantidade</th>
          </tr>
          {
            props.report.items.map((element, index) => (
              <tr key={`${element.client.id}-${index}`}>
                <td className="colum-item" >{element.client.name}</td>
                <td className="colum-item" id="colum-qtd">{element.quantity} {props.unit}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default ResProductList;