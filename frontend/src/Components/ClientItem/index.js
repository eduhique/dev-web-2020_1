import React, { useState, useEffect } from 'react';
import ClientEdit from "../ClientEdit"
import './style.scss'

function ClientItem({ setMode, setLoading, onSubmit, ...props }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [modeEdit, setModeEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const editPropert = e => {
    setIsEdit(true);
    setMode(true);
  }
  const handleSubmit = e => {
    setIsEdit(false);
    onSubmit(e);
  }
  const deleteItem = e => {

  }

  const cancelEdit = e => {
    setIsEdit(false);
    setMode(false);
  }

  useEffect(_ => {
    setName(props.name);
    setType(props.type);
    setModeEdit(props.mode);
  }, [props.name, props.type, props.mode])

  return (
    <div>
      { modeEdit && isEdit ? <ClientEdit
        id={props.id}
        name={props.name}
        type={props.type}
        setLoading={true}
        onSubmit={handleSubmit}
        cancelEdit={cancelEdit} /> : <div className="client-item">
          <div className="client-name">
            <p>{name}</p>
          </div>
          <div className="client-other">
            <div className="type-algn">
              <p>{type}</p>
            </div>
            <div className={"client-edit"}>
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

export default ClientItem;