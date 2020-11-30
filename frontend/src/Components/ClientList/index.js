import React, { useEffect } from 'react';
import './style.scss'
import ClientItem from '../ClientItem'


function ClientsList({ clients, setLoading, setModeEdit, modeEdit }) {

  useEffect(_ => {
  }, [setModeEdit, modeEdit])

  return (

    <div className="client-list container">
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