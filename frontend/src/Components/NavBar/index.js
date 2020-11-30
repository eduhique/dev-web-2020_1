import React, { useState } from 'react';
import {
  Link, useHistory
} from 'react-router-dom';
import { useRomaneio } from "../RomaneioProvider";
import './style.scss';

const getDataFormat = (data) => {
  let dataAux = new Date(data);
  return `${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()}`
}

function NavBar() {
  const history = useHistory();
  const { romaneio, romaneios, setRomaneio } = useRomaneio();
  const [userInput, setUserInput] = useState("");

  function handleChange(event) {
    let target = event.target;
    if (target.name === 'nav-search') {
      let input = event.target.value;
      setUserInput(input);
      search();
    }
    if (target.name === 'romaneios') {
      setRomaneio(JSON.parse(target.value));
    }
  }
  function onKeyPress(event) {
    if (event.key === 'Enter' && userInput) {
      search();
    }
  }

  function search() {
    if (userInput) {
      history.push(`/search?s=${userInput}`)
    }
  }

  return (
    <div id="header-app">
      <div className="buttons-nav">
        <div>
          <Link to="/" className="nav-button">Início</Link>
        </div>
        <div>
          <Link to="/order/" className="nav-button">Pedidos</Link>
        </div>
        <div>
          <Link to="/romaneio/" className="nav-button">Romaneios</Link>
        </div>
        <div>
          <Link to="/product/" className="nav-button">Produtos</Link>
        </div>
        <div>
          <Link to="/client/" className="nav-button">Clientes</Link>
        </div>
      </div>
      <div className="nav-search">
        <input
          type="search"
          name="nav-search"
          value={userInput}
          placeholder="Pesquisar"
          className="search-input"
          onChange={handleChange}
          onKeyPress={onKeyPress}
        />
        <input type="button" value="Pesquisar" onClick={_ => search()} />
      </div>
      <div className="navigation-select">
        <select value={JSON.stringify(romaneio)} name="romaneios" onChange={handleChange}>
          {
            romaneios.map((e) => (
              <option key={e.id} value={JSON.stringify(e)}>{e.title} {getDataFormat(e.date)}</option>
            ))
          }
        </select>
      </div>
    </div>
  );
}

export default NavBar;