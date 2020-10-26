import React from 'react';
import {
  Link
} from 'react-router-dom';
import { useRomaneio } from "../RomaneioProvider";
import './style.scss';
// import Loading from '../../Components/Loading'
// import api from '../../services/Api';
// import NewRomaneio from '../../Components/NewRomaneio';
// import RomaneiosList from '../../Components/RomaneiosList';

const getDataFormat = (data) => {
  let dataAux = new Date(data);
  return `${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()}`
}

function NavBar() {
  const { romaneio, romaneios, setRomaneio } = useRomaneio();
  // const [loading, setLoading] = useState(false);

  const handleChange = e => {
    let target = e.target;

    setRomaneio(JSON.parse(target.value));
  }

  return (
    <header >
      <div className="nav-button">
        <Link to="/order/" >Pedidos</Link>
      </div>
      <div className="nav-button">
        <Link to="/romaneio/" >Romaneios</Link>
      </div>
      <div className="nav-button">
        <Link to="/product/" >Produtos</Link>
      </div>
      <div className="nav-button">
        <Link to="/client/" >Clientes</Link>
      </div>
      <div className="nav-button" id="navigation-select">
        <select value={JSON.stringify(romaneio)} name="romaneios" onChange={handleChange}>
          {
            romaneios.map((e) => (
              <option key={e.id} value={JSON.stringify(e)}>{e.title} {getDataFormat(e.date)}</option>
            ))
          }
        </select>
      </div>

    </header>
  );
}

export default NavBar;