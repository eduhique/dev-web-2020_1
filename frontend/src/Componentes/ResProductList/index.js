import React from 'react';
import './style.css'

function ResProductList(props) {
  return (
    <div className="resume-list">
      <table>
        <tbody>
          <tr>
            <th>Cliente</th>
            <th>Quantidade</th>
          </tr>
          {
            props.resume.items.map((element) => (
              <tr key={element.cliente.id}>
                <td className="colum-item" >{element.cliente.nome}</td>
                <td className="colum-item" id="colum-qtd">{element.quantidade} {props.unidade}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default ResProductList;