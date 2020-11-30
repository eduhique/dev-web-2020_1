import React, { useState, useEffect } from 'react';
import NewProduct from '../../Components/NewProduct';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
import './style.scss';
import ProductsList from '../../Components/ProductsList';


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('NONE');
  const [modeEdit, setModeEdit] = useState(false)


  async function addProduct(product) {
    setLoading(true);
    await products.push(product);
    setLoading(false);
  }


  useEffect(_ => {
    const compare = (a, b) => {
      let split = sort.split("/");
      if (split[0] === "NAME" || (split[0] === "TYPE" && a.unit.toUpperCase().trim() === b.unit.toUpperCase().trim())) {
        if (split[1] === "ASC") {
          return ((a.name.toUpperCase().trim() < b.name.toUpperCase().trim()) ? -1 : ((a.name.toUpperCase().trim() > b.name.toUpperCase().trim()) ? 1 : 0));
        } else if (split[1] === "DSC") {
          return ((b.name.toUpperCase().trim() < a.name.toUpperCase().trim()) ? -1 : ((b.name.toUpperCase().trim() > a.name.toUpperCase().trim()) ? 1 : 0));
        }
      } else if (split[0] === "TYPE") {
        if (split[1] === "ASC") {
          return ((a.unit.toUpperCase().trim() < b.unit.toUpperCase().trim()) ? -1 : ((a.unit.toUpperCase().trim() > b.unit.toUpperCase().trim()) ? 1 : 0));
        } else if (split[1] === "DSC") {
          return ((b.unit.toUpperCase().trim() < a.unit.toUpperCase().trim()) ? -1 : ((b.unit.toUpperCase().trim() > a.unit.toUpperCase().trim()) ? 1 : 0));
        }
      }
    }
    async function getData() {
      let response = await api.get('product/');
      let products = response.data;
      products.sort(compare)
      setProducts(sort === "NONE" ? products : products.sort(compare));
    }
    setLoading(true);
    getData();
    setLoading(false)
  }, [setProducts, loading, sort])

  return (
    <div>
      <div className="product-title"><h2>Produtos</h2></div>
      <NewProduct onSubmit={addProduct} />
      <div className="actions container">
        <div>
          <p>Ordenar por:</p>
          <select value={sort} disabled={modeEdit} name="type" onChange={event => setSort(event.target.value)}>
            <option value="NONE">Relevância</option>
            <option value="NAME/ASC">Nome (A a Z)</option>
            <option value="NAME/DSC">Nome (Z a A)</option>
            <option value="TYPE/ASC">Unidade (A a Z)</option>
            <option value="TYPE/DSC">Unidade (Z a A)</option>
          </select>
        </div>
      </div>
      {loading ? <Loading /> :
        <ProductsList products={products} setLoading={setLoading} modeEdit={modeEdit} setModeEdit={setModeEdit} />
      }
    </div>
  );

}

export default Products;