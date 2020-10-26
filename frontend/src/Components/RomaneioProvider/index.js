import React, { createContext, useState, useContext, useEffect } from "react";
import api from '../../services/Api';

const RomaneioContext = createContext();

const getDataFormat = (data) => {
  let dataAux = new Date(data);
  return `${dataAux.getFullYear()}-${dataAux.getMonth() > 8 ? dataAux.getMonth() + 1 : `0${dataAux.getMonth() + 1}`}-${dataAux.getDate() > 9 ? dataAux.getDate() : `0${dataAux.getDate()}`}`
}

export default function RomaneioProvider({ children }) {
  const [romaneios, setRomaneios] = useState([]);
  const [romaneio, setRomaneio] = useState({});

  return (
    <RomaneioContext.Provider value={{ romaneios, romaneio, setRomaneio, setRomaneios }}>
      {children}
    </RomaneioContext.Provider>
  );
}

export function useRomaneio() {
  const context = useContext(RomaneioContext);
  const { romaneios, romaneio, setRomaneio, setRomaneios } = context;
  const [change, setChange] = useState(false);

  useEffect(_ => {
    const getClosestDate = romaneiosList => {

      if ((Object.keys(romaneio).length === 0 || romaneio === undefined) && romaneiosList.length > 0) {
        const now = getDataFormat(new Date());
        let closest = Infinity;
        romaneiosList.forEach((d) => {
          const date = d.date;
          if (date >= now && (date <= getDataFormat(closest.date))) {
            closest = d;
          }
        });
        if (closest === Infinity) {
          closest = romaneiosList[romaneiosList.length - 1];
        }
        setRomaneio(closest)
      }
    }
    async function getData() {
      let response = await api.get('romaneio/');
      setRomaneios(response.data);
      getClosestDate(response.data)
    }
    getData();
  }, [setRomaneios, setRomaneio, romaneio, change])

  return { romaneios, romaneio, setRomaneio, change, setChange };
}