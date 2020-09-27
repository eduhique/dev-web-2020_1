import React, { useState, useEffect } from 'react';
import NewProduct from '../../Components/NewProduct';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
// import { Link } from 'react-router-dom';
import './style.scss';
import ProductsList from '../../Components/ProductsList';


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function addProduct(product) {
    setLoading(true);
    await products.push(product);
    setLoading(false);
  }

  useEffect(_ => {
    async function getData() {
      let response = await api.get('product/');
      setProducts(response.data);
    }
    getData();
  }, [setProducts])

  return (
    <div>
      <div className="product-title"><h2>Product</h2></div>
      <NewProduct onSubmit={addProduct} />
      {loading ? <Loading /> :
        <ProductsList products={products} />
      }
    </div>
  );

}

export default Products;