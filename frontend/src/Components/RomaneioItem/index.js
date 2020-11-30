import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RomaneioEdit from '../RomaneioEdit';
import { useRomaneio } from '../RomaneioProvider';
import './style.scss'

function RomaneioItem({ setMode, onSubmit, ...props }) {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [modeEdit, setModeEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { setRomaneio } = useRomaneio();

  const getDataFormat = (data) => {
    let dataAux = new Date(data);
    return `${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()}`
  }

  const editPropert = e => {
    setIsEdit(true);
    setMode(true);
  }
  const handleSubmit = e => {
    setIsEdit(false);
    onSubmit(e);
  }

  const handleClick = _ => {
    setRomaneio({ id: props.id, title: props.title, date: props.date });
    history.push(`/order/`)
  }

  const cancelEdit = e => {
    setIsEdit(false);
    setMode(false);
  }

  useEffect(_ => {
    setTitle(props.title);
    setDate(props.date);
    setModeEdit(props.mode);
  }, [props.title, props.date, props.mode])

  return (
    <div>
      { modeEdit && isEdit ? <RomaneioEdit
        id={props.id}
        title={props.title}
        date={props.date}
        onSubmit={handleSubmit}
        cancelEdit={cancelEdit} /> : <div className="romaneio-item">
          <div className="romaneio-name">
            <p className="clickElement" onClick={_ => { if (!modeEdit) handleClick() }}>{title}</p>
          </div>
          <div className="romaneio-other">
            <div className="type-algn">
              <p>{getDataFormat(date)}</p>
            </div>
            <div className={"romaneio-edit"}>
              <ul>
                <li><button disabled={modeEdit} onClick={editPropert}>Edit</button></li>
              </ul>
            </div>
          </div>
        </div >
      }
    </div>
  );
}

export default RomaneioItem;