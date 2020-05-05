import React from 'react';
import './style.css';

function ProdutosList({ produtos }) {
  return (
    <div className="produto-list">
      {
        produtos.map((e) => (
          <li key={e.id}>{e.nome} - <b>Unidade:</b> {e.unidade}</li>
        ))
      }
    </div>
  );
}

export default ProdutosList;