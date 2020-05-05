import React from 'react';
import './style.css'

function ClientesList({ clientes }) {
  return (
    <div className="cliente-list">
      <table>
        <tbody>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
          </tr>
          {
            clientes.map((element) => (
              <tr key={element.id}>
                <td className="colum-item" >{element.nome}</td>
                <td className="colum-item" id="colum-qtd">{element.tipo}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default ClientesList;