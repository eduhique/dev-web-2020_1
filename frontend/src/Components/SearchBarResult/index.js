import React, { useState, useEffect } from 'react';
import './style.scss';
import api from '../../services/Api';
import RomaneioItemSearch from '../RomaneioItemSearch';

function SearchBarResult(props) {
  const [romaneios, setRomaneios] = useState([])

  useEffect(_ => {
    async function getData() {
      let response = await api.get(`romaneio/?s=${new URLSearchParams(props.location.search).get("s")}`);
      setRomaneios(response.data);
    }
    getData();
  }, [props.location.search])
  return (
    <div className="romaneio-list container">
      {
        romaneios.map((element) => (
          <RomaneioItemSearch
            key={element.id}
            id={element.id}
            title={element.title}
            date={element.date} />
        ))
      }
    </div >
  );
}

export default SearchBarResult;