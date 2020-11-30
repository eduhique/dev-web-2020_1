import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../../Components/Loading'
import ResProductList from '../../Components/ResProductList';
import { useRomaneio } from '../../Components/RomaneioProvider';
import api from '../../services/Api';
import './style.scss';

function ReportProduct(props) {
  const history = useHistory();
  const [reportProduct, setReportProduct] = useState();
  const [sort, setSort] = useState('NAME/ASC');
  const { romaneio } = useRomaneio();

  useEffect(_ => {
    if (reportProduct && reportProduct.romaneio && romaneio.id !== reportProduct.romaneio.id) {
      history.push(`/report/${romaneio.id}`)
    }
    const compare = (a, b) => {
      let split = sort.split("/");
      if (split[0] === "NAME" || (split[0] === "QTD" && a.quantity === b.quantity)) {
        if (split[1] === "ASC") {
          return ((a.client.name.toUpperCase().trim() < b.client.name.toUpperCase().trim()) ? -1 : ((a.client.name.toUpperCase().trim() > b.client.name.toUpperCase().trim()) ? 1 : 0));
        } else if (split[1] === "DSC") {
          return ((b.client.name.toUpperCase().trim() < a.client.name.toUpperCase().trim()) ? -1 : ((b.client.name.toUpperCase().trim() > a.client.name.toUpperCase().trim()) ? 1 : 0));
        }
      } else if (split[0] === "QTD") {
        if (split[1] === "ASC") {
          return a.quantity - b.quantity;
        } else if (split[1] === "DSC") {
          return b.quantity - a.quantity;
        }
      }
    }

    async function getData() {
      let response = await api.get(`report/product/?romaneioId=${new URLSearchParams(props.location.search).get("romaneioId")}&productId=${new URLSearchParams(props.location.search).get("productId")}`);
      let reports = response.data;
      reports.items.sort(compare)
      setReportProduct(reports);
    }
    getData();
  }, [setReportProduct, props.location.search, sort, romaneio])

  return (
    <div>
      {reportProduct === undefined ? <Loading /> :
        <div className="report">
          <div className="report-product"><h2>{reportProduct.product.name}</h2></div>
          <div className="report-title"> <h4>Romaneio: {reportProduct.romaneio.title}</h4></div>
          <div className="actions container">
            <div>
              <p>Ordenar por:</p>
              <select value={sort} name="type" onChange={event => setSort(event.target.value)}>
                <option value="NAME/ASC">Cliente (A a Z)</option>
                <option value="NAME/DSC">Cliente (Z a A)</option>
                <option value="QTD/DSC">Maior Quantidade</option>
                <option value="QTD/ASC">Menor Quantidade</option>
              </select>
            </div>
          </div>
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