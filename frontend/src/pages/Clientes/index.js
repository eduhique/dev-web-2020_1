import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
import './style.css'
// import { Link } from 'react-router-dom'

function Clientes() {
  const [clientes, setClientes] = useState();

  useEffect(_ => {
    async function getData() {
      let response = await api.get('cliente/');
      setClientes(response.data);
    }
    getData();
  }, [setClientes])


  return (
    <div>
      <div className="cliente-title"><h1>Clientes</h1></div>
      {clientes === undefined ? <Loading /> :
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
      }
    </div>
  );

}

export default Clientes;