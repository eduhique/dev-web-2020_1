import React, { useState, useEffect } from 'react';
import './style.scss';
import { useRomaneio } from "../RomaneioProvider";
import RomaneioItem from '../RomaneioItem';

function RomaneiosList() {
  const { romaneios, change, setChange, sort, setSort } = useRomaneio();
  const [modeEdit, setModeEdit] = useState(false)

  useEffect(_ => {
  }, [setModeEdit, modeEdit])
  return (
    <div className="romaneio-list container">
      <div className="actions container">
        <div>
          <p>Ordenar por:</p>
          <select value={sort} disabled={modeEdit} name="type" onChange={event => setSort(event.target.value)}>
            <option value="NONE">Relevância</option>
            <option value="TITLE/ASC">Nome (A a Z)</option>
            <option value="TITLE/DSC">Nome (Z a A)</option>
            <option value="DATE/ASC">Data (crescente)</option>
            <option value="DATE/DSC">Date (decrescente)</option>
          </select>
        </div>
      </div>
      {
        romaneios.map((element) => (
          <RomaneioItem
            key={element.id}
            id={element.id}
            title={element.title}
            date={element.date}
            mode={modeEdit}
            onSubmit={e => { setModeEdit(false); setChange(!change) }}
            setMode={setModeEdit} />
        ))
      }
    </div >
  );
}

export default RomaneiosList;