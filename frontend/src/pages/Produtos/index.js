import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
// import { Link } from 'react-router-dom'

function Produtos() {
  const [produtos, setProdutos] = useState();

  useEffect(_ => {
    async function getData() {
      let response = await api.get('produto/');
      setProdutos(response.data);
    }
    getData();
  }, [setProdutos])

  return (
    <div>
      <div className="produto-title"><h2>Produto</h2></div>
      {produtos === undefined ? <Loading /> :
        <div className="produto-list">
          {
            produtos.map((e) => (
              <li key={e.id}>{e.nome} - <b>Unidade:</b> {e.unidade}</li>
            ))
          }
        </div>
      }
    </div>
  );

}

export default Produtos;