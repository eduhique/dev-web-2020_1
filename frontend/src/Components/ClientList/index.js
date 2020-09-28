import React from 'react';
import './style.scss'

function ClientsList({ clients }) {
  return (
    <div className="client-list">
      <table>
        <tbody>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
          </tr>
          {
            clients.map((element) => (
              <tr key={element.id}>
                <td className="colum-item" >{element.name}</td>
                <td className="colum-item" id="colum-qtd">{element.type}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default ClientsList;