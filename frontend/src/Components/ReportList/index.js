import React from 'react';
import {
  Link
} from 'react-router-dom'
import './style.scss'

function ReportList(props) {
  return (
    <div className="report-list">
      <table>
        <tbody>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
          </tr>
          {
            props.report.items.map((element) => (
              <tr key={element.id}>
                <td className="colum-item" ><Link to={`/report/product/?romaneioId=${props.romaneioId}&productId=${element.id}`}>{element.name}</Link> </td>
                <td className="colum-item" id="colum-qtd">{element.quantity} {element.unit === "cx" ? "Caixas" : (element.unit === "kg" ? "Quilos" : "unidades")}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default ReportList;