import React, { createContext, useState, useContext, useEffect } from "react";
import api from '../../services/Api';

const RomaneioContext = createContext();

const getDataFormat = (data) => {
  let dataAux = new Date(data);
  return `${dataAux.getFullYear()}-${dataAux.getMonth() > 8 ? dataAux.getMonth() + 1 : `0${dataAux.getMonth() + 1}`}-${dataAux.getDate() > 9 ? dataAux.getDate() : `0${dataAux.getDate()}`}`
}

export default function RomaneioProvider({ children }) {
  const [romaneios, setRomaneios] = useState([]);
  const [romaneio, setRomaneio] = useState(localStorage.getItem("romaneioAtual") !== null && typeof JSON.parse(localStorage.getItem("romaneioAtual")) === "object" && JSON.parse(localStorage.getItem("romaneioAtual")).id > 0 ? JSON.parse(localStorage.getItem("romaneioAtual")) : {});

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
  const [sort, setSort] = useState('NONE');

  useEffect(_ => {
    const compare = (a, b) => {
      let split = sort.split("/");
      if (split[0] === "TITLE" || (split[0] === "DATE" && new Date(a.date) === new Date(b.date))) {
        if (split[1] === "ASC") {
          return ((a.title.toUpperCase().trim() < b.title.toUpperCase().trim()) ? -1 : ((a.title.toUpperCase().trim() > b.title.toUpperCase().trim()) ? 1 : 0));
        } else if (split[1] === "DSC") {
          return ((b.title.toUpperCase().trim() < a.title.toUpperCase().trim()) ? -1 : ((b.title.toUpperCase().trim() > a.title.toUpperCase().trim()) ? 1 : 0));
        }
      } else if (split[0] === "DATE") {
        if (split[1] === "ASC") {
          return ((new Date(a.date) < new Date(b.date)) ? -1 : ((new Date(a.date) > new Date(b.date)) ? 1 : 0));
        } else if (split[1] === "DSC") {
          return ((new Date(b.date) < new Date(a.date)) ? -1 : ((new Date(b.date) > new Date(a.date)) ? 1 : 0));
        }
      }
    }

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
        localStorage.setItem("romaneioAtual", JSON.stringify(closest))
      }
    }

    localStorage.setItem("romaneioAtual", JSON.stringify(romaneio))
    async function getData() {
      let response = await api.get('romaneio/');
      let romaneios = response.data;
      romaneios.sort(compare)
      setRomaneios(sort === "NONE" ? romaneios : romaneios.sort(compare));
      if (romaneio.id === undefined || (romaneio.id > 0 && response.data.findIndex(obj => {
        if ((obj.id !== undefined && !isNaN(obj.id)) && (romaneio.id > 0) && obj.id === romaneio.id) {
          return true;
        } else {
          return false;
        }
      }) < 0)) {
        getClosestDate(response.data)
      }
    }
    getData();
  }, [setRomaneios, setRomaneio, romaneio, change, sort])

  return { romaneios, romaneio, setRomaneio, change, setChange, sort, setSort };
}