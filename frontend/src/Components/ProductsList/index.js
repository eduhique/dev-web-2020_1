import React from 'react';
import './style.scss';

function ProductsList({ products }) {
  return (
    <div className="product-list">
      {
        products.map((e) => (
          <li key={e.id}>{e.name} - <b>Unidade:</b> {e.unit}</li>
        ))
      }
    </div>
  );
}

export default ProductsList;