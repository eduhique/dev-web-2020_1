import React from 'react';
import './style.css'

function ResumeTotais(props) {
  return (
    <div className="resume-sub">
      {!(props.subCaixas === undefined) && <p><b>Quantidade de caixas:</b>  {props.subCaixas} cx</p>}
      {!(props.subQuilos === undefined) && <p><b>Quantidade de unidades:</b>  {props.subQuilos} kg</p>}
      {!(props.subUnidades === undefined) && <p><b>Quantidade de quilos:</b>  {props.subUnidades} und</p>}
    </div>
  );
}

export default ResumeTotais;