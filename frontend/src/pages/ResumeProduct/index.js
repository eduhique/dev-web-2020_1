import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import ResProductList from '../../Components/ResProductList';
import api from '../../services/Api';
import './style.css';

function ResumeProduct(props) {
  const [resumeProduct, setResumeProduct] = useState();

  useEffect(_ => {
    async function getData() {
      let response = await api.get(`resume/product/?romaneioId=${new URLSearchParams(props.location.search).get("romaneioId")}&produtoId=${new URLSearchParams(props.location.search).get("produtoId")}`);
      setResumeProduct(response.data);
    }
    getData();
  }, [setResumeProduct, props.location.search])

  return (
    <div>
      {resumeProduct === undefined ? <Loading /> :
        <div className="resume">
          <div className="resume-product"><h2>{resumeProduct.produto.nome}</h2></div>
          <div className="resume-title"> <h4>Romaneio: {resumeProduct.romaneio.title}</h4></div>
          <div className="resume-sub">
            {resumeProduct.produto.unidade === 'cx' && <p><b>Quantidade de caixas:</b>  {resumeProduct.total} {resumeProduct.produto.unidade}</p>}
            {resumeProduct.produto.unidade === 'und' && <p><b>Quantidade de unidades:</b>  {resumeProduct.total} {resumeProduct.produto.unidade}</p>}
            {resumeProduct.produto.unidade === 'kg' && <p><b>Quantidade de quilos:</b>  {resumeProduct.total} {resumeProduct.produto.unidade}</p>}
          </div>
          <hr />
          <ResProductList resume={resumeProduct} unidade={resumeProduct.produto.unidade} />
        </div>
      }
    </div>
  );
}

export default ResumeProduct;