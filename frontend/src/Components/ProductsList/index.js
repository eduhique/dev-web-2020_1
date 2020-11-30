import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import './style.scss';

function ProductsList({ products, setLoading, modeEdit, setModeEdit }) {

  useEffect(_ => {
  }, [setModeEdit, modeEdit])
  return (
    <div className="client-list container">
      {
        products.map((element) => (
          <ProductItem
            key={element.id}
            id={element.id}
            name={element.name}
            unit={element.unit}
            setLoading={setLoading}
            mode={modeEdit}
            onSubmit={e => { setModeEdit(false); setLoading(true); }}
            setMode={setModeEdit} />
        ))
      }
    </div>
  );
}
export default ProductsList;