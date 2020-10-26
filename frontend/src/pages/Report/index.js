import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import ReportTotais from '../../Components/ReportTotais'
import ReportList from '../../Components/ReportList'
import api from '../../services/Api';
import { useRomaneio } from "../../Components/RomaneioProvider";

import './style.scss';

function Report(props) {
  const [report, setReport] = useState();
  const { romaneio } = useRomaneio();

  useEffect(_ => {
    async function getData() {
      let response = await api.get(`report/${romaneio.id}`);
      setReport(response.data);
    }
    if (romaneio.id !== undefined) {
      getData();
    }
  }, [romaneio.id, setReport])

  return (
    <div>
      {report === undefined ? <Loading /> :
        <div className="report">
          <div className="report-title"><h2>Romaneio: {report.romaneio.title}</h2></div>
          <ReportTotais subCaixas={report.subCaixas} subQuilos={report.subQuilos} subUnits={report.subUnits} />
          <hr />
          <ReportList report={report} romaneioId={report.romaneio.id} />
        </div>
      }
    </div>
  );
}

export default Report;