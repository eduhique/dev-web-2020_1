import React from 'react';
import './style.scss'

function ReportTotais(props) {
  return (
    <div className="report-sub">
      {!(props.subCaixas === undefined) && <p><b>Quantidade de caixas:</b>  {props.subCaixas} cx</p>}
      {!(props.subQuilos === undefined) && <p><b>Quantidade de unidades:</b>  {props.subQuilos} kg</p>}
      {!(props.subUnits === undefined) && <p><b>Quantidade de quilos:</b>  {props.subUnits} und</p>}
    </div>
  );
}

export default ReportTotais;