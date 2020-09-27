import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import ResProductList from '../../Components/ResProductList';
import api from '../../services/Api';
import './style.scss';

function ReportProduct(props) {
  const [reportProduct, setReportProduct] = useState();

  useEffect(_ => {
    async function getData() {
      let response = await api.get(`report/product/?romaneioId=${new URLSearchParams(props.location.search).get("romaneioId")}&productId=${new URLSearchParams(props.location.search).get("productId")}`);
      setReportProduct(response.data);
    }
    getData();
  }, [setReportProduct, props.location.search])

  return (
    <div>
      {reportProduct === undefined ? <Loading /> :
        <div className="report">
          <div className="report-product"><h2>{reportProduct.product.name}</h2></div>
          <div className="report-title"> <h4>Romaneio: {reportProduct.romaneio.title}</h4></div>
          <div className="report-sub">
            {reportProduct.product.unit === 'cx' && <p><b>Quantidade de caixas:</b>  {reportProduct.total} {reportProduct.product.unit}</p>}
            {reportProduct.product.unit === 'und' && <p><b>Quantidade de unidades:</b>  {reportProduct.total} {reportProduct.product.unit}</p>}
            {reportProduct.product.unit === 'kg' && <p><b>Quantidade de quilos:</b>  {reportProduct.total} {reportProduct.product.unit}</p>}
          </div>
          <hr />
          <ResProductList report={reportProduct} unit={reportProduct.product.unit} />
        </div>
      }
    </div>
  );
}

export default ReportProduct;