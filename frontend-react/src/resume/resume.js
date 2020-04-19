import React, { useState, useEffect } from 'react';
import { loadData } from "../data/data";
import './resume.css';


async function resumeData(data) {
  let exit = {}
  let dados = data.pedidos
  dados.forEach(element => {
    element.pedido.forEach(element => {
      if (!(element.produto in exit)) {
        exit[element.produto] = {
          "quantidade": element.quantidade,
          "unidade": element.unidade
        }
      } else {
        if (exit[element.produto].unidade === element.unidade) {
          exit[element.produto].quantidade += element.quantidade
        }
      }
    });
  });
  return exit;
}

function Resume() {
  const [data, setData] = useState({});
  const [resume, setResume] = useState({});

  useEffect(_ => {
    async function getData() {
      let entry = await loadData();
      let resumeD = await resumeData(entry);
      setData(entry);
      setResume(resumeD);
    };
    getData();
  }, [setData, setResume]);

  return (
    <div>
      <div id="resume-title"><h1>Romaneio: {data.title} {data.date}</h1></div>
      <div id="resume-list">
        <table>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
          </tr>
          {
            Object.entries(resume).map((element, i) => (
              <tr>
                <td className="colum-item">{element[0]}</td>
                <td className="colum-item">{element[1].quantidade} {element[1].unidade}</td>
              </tr>
            ))
          }
        </table>
      </div>
    </div>
  );
}

export default Resume;