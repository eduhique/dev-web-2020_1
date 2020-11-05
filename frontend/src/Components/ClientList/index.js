import React, { useState, useEffect } from 'react';
import './style.scss'
import ClientItem from '../ClientItem'


function ClientsList({ clients, setLoading }) {
  const [modeEdit, setModeEdit] = useState(false)

  useEffect(_ => {
  }, [setModeEdit, modeEdit])
  return (
    <div className="client-list container">
      {/* <div><h3>Todos os clientes</h3></div> */}
      {
        clients.map((element) => (
          <ClientItem
            key={element.id}
            id={element.id}
            name={element.name}
            type={element.type}
            setLoading={setLoading}
            mode={modeEdit}
            onSubmit={e => { setModeEdit(false); setLoading(true); }}
            setMode={setModeEdit} />
        ))
      }
    </div>
  );
}

export default ClientsList;