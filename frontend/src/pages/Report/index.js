import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import ReportTotais from '../../Components/ReportTotais'
import ReportList from '../../Components/ReportList'
import api from '../../services/Api';
import { useRomaneio } from "../../Components/RomaneioProvider";

import './style.scss';

function Report(props) {
  const [report, setReport] = useState();
  const [sort, setSort] = useState('NAME/ASC');
  const { romaneio } = useRomaneio();

  useEffect(_ => {
    const compare = (a, b) => {
      let split = sort.split("/");
      if (split[0] === "NAME" || (split[0] === "TYPE" && a.unit.toUpperCase().trim() === b.unit.toUpperCase().trim()) || (split[0] === "QTD" && a.quantity === b.quantity)) {
        if (split[1] === "ASC") {
          return ((a.name.toUpperCase().trim() < b.name.toUpperCase().trim()) ? -1 : ((a.name.toUpperCase().trim() > b.name.toUpperCase().trim()) ? 1 : 0));
        } else if (split[1] === "DSC") {
          return ((b.name.toUpperCase().trim() < a.name.toUpperCase().trim()) ? -1 : ((b.name.toUpperCase().trim() > a.name.toUpperCase().trim()) ? 1 : 0));
        }
      } else if (split[0] === "QTD") {
        if (split[1] === "ASC") {
          if (a.unit.toUpperCase().trim() === b.unit.toUpperCase().trim()) {
            return a.quantity - b.quantity;
          }
          return ((a.unit.toUpperCase().trim() < b.unit.toUpperCase().trim()) ? -1 : ((a.unit.toUpperCase().trim() > b.unit.toUpperCase().trim()) ? 1 : 0));
        } else if (split[1] === "DSC") {
          if (a.unit.toUpperCase().trim() === b.unit.toUpperCase().trim()) {
            return b.quantity - a.quantity;
          }
          return ((a.unit.toUpperCase().trim() < b.unit.toUpperCase().trim()) ? -1 : ((a.unit.toUpperCase().trim() > b.unit.toUpperCase().trim()) ? 1 : 0));

        }
      } else if (split[0] === "TYPE") {
        if (split[1] === "ASC") {
          return ((a.unit.toUpperCase().trim() < b.unit.toUpperCase().trim()) ? -1 : ((a.unit.toUpperCase().trim() > b.unit.toUpperCase().trim()) ? 1 : 0));
        } else if (split[1] === "DSC") {
          return ((b.unit.toUpperCase().trim() < a.unit.toUpperCase().trim()) ? -1 : ((b.unit.toUpperCase().trim() > a.unit.toUpperCase().trim()) ? 1 : 0));
        }
      }
    }

    async function getData() {
      let response = await api.get(`report/${romaneio.id}`);
      let reports = response.data;
      reports.items.sort(compare)
      setReport(reports);
    }
    if (romaneio.id !== undefined) {
      getData();
    }
  }, [romaneio.id, setReport, sort])

  return (
    <div>
      {report === undefined ? <Loading /> :
        <div className="report">
          <div className="report-title"><h2>Romaneio: {report.romaneio.title}</h2></div>
          <div className="actions container">
            <div>
              <p>Ordenar por:</p>
              <select value={sort} name="type" onChange={event => setSort(event.target.value)}>
                <option value="NAME/ASC">Produto (A a Z)</option>
                <option value="NAME/DSC">Produto (Z a A)</option>
                <option value="QTD/DSC">Maior Quantidade</option>
                <option value="QTD/ASC">Menor Quantidade</option>
                <option value="TYPE/ASC">Unidade (A a Z)</option>
                <option value="TYPE/DSC">Unidade (Z a A)</option>
              </select>
            </div>
          </div>
          <ReportTotais subCaixas={report.subCaixas} subQuilos={report.subQuilos} subUnits={report.subUnits} />
          <hr />
          <ReportList report={report} romaneioId={report.romaneio.id} />
        </div>
      }
    </div>
  );
}

export default Report;