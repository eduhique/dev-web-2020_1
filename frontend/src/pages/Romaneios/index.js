import React from 'react';
import './style.scss';
import NewRomaneio from '../../Components/NewRomaneio';
import RomaneiosList from '../../Components/RomaneiosList';

function Romaneios() {
  return (
    <div>
      <div><h3>Romaneios</h3></div>
      <NewRomaneio />
      <RomaneiosList />
    </div>
  );
}

export default Romaneios;