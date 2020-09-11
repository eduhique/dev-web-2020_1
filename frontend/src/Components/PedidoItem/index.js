import React from 'react';
import ResumeTotais from '../ResumeTotais'
import './style.css';

function PedidoItem({ pedido }) {
  return (
    <div className="pedido">
      <div className="cliente-info">
        <b>Cliente:</b> {pedido.cliente.nome}
        <b>Tipo:</b>{pedido.cliente.tipo}
      </div>
      <br />
      <table>
        <tbody>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
          </tr>
          {pedido.items.map((e, i) => (
            <tr key={i}>
              <td className="colum-item" >{e.produto.nome}</td>
              <td className="colum-item" id="colum-qtd">{e.quantidade} {e.produto.unidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ResumeTotais subCaixas={pedido.subCaixas} subQuilos={pedido.subQuilos} subUnidades={pedido.subUnidades} />
      <hr />
      <br />
    </div>
  );
}

export default PedidoItem;