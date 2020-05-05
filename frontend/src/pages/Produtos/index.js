import React, { useState, useEffect } from 'react';
import NewProduct from '../../Components/NewProduct';
import Loading from '../../Components/Loading'
import api from '../../services/Api';
// import { Link } from 'react-router-dom';
import './style.css';
import ProdutosList from '../../Components/ProdutosList';


function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function addProduct(produto) {
    setLoading(true);
    await produtos.push(produto);
    setLoading(false);
  }

  useEffect(_ => {
    async function getData() {
      let response = await api.get('produto/');
      setProdutos(response.data);
    }
    getData();
  }, [setProdutos])

  return (
    <div>
      <div className="produto-title"><h2>Produto</h2></div>
      <NewProduct onSubmit={addProduct} />
      {loading ? <Loading /> :
        <ProdutosList produtos={produtos} />
      }
    </div>
  );

}

export default Produtos;