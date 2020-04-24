import React from 'react';
import {
  Link
} from 'react-router-dom'
import './style.css'

function ResumeList(props) {
  return (
    <div className="resume-list">
      <table>
        <tbody>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
          </tr>
          {
            props.resume.items.map((element) => (
              <tr key={element.id}>
                <td className="colum-item" >{element.nome} <Link to={`/resume/product/?romaneioId=${props.romaneioId}&produtoId=${element.id}`}>Mais</Link> </td>
                <td className="colum-item" id="colum-qtd">{element.quantidade} {element.unidade}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default ResumeList;