import React, { useState, useEffect } from 'react';
import api, { abort } from '../../services/Api';
import SelectSearch from '../SelectSearch';
// import { Link } from 'react-router-dom';
import './style.scss';


function NewOrderItem({ items, setItems, productProps }) {

  const [productId, setProductId] = useState(productProps.productId);
  const [quantity, setQuantity] = useState(productProps.quantity | 0);
  const [productAtual, setProductAtual] = useState(productProps.product | {});
  const [disableButton, setDisableButton] = useState(true);
  const [resetInput, setResetInput] = useState(true);
  const [step, setStep] = useState("1");

  function selectProduct(product) {
    setProductId(product.id);
    setProductAtual(product);
  }

  async function searchProduct(userInput) {
    let data = [];
    await api.get(`product/search/?s=${userInput}`).then(response => {
      data = response.data
    })
      .catch(response => data = []);
    return data.filter(obj => !items.find(item => item.productId === obj.id));
  }

  function handleChange(event) {
    const target = event.currentTarget;
    if (target.name === 'qtd') {
      const input = target.value;
      setQuantity(input);
    }
  }
  function addItem(event) {
    if (validation(productId, quantity, productAtual)) {
      setItems([...items, { productId, quantity: Number(quantity), product: productAtual }]);
      setProductId(undefined);
      setProductAtual({});
      setQuantity(0);
      setResetInput(true);
    }
  }

  useEffect(() => {
    if (validation(productId, quantity, productAtual)) {
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
    setResetInput(false);
    if (productAtual.unit === "kg") {
      setStep("any")
    }

    return _ => abort();
  }, [productId, quantity, productAtual])

  return (
    <div className="">
      <SelectSearch onSelect={selectProduct} placeholder="Insira um Produto" modelName="Produtos" inputProperty="name" searchFunction={searchProduct} resetInput={resetInput} />
      <input type="number" className="qtd" name="qtd" inputMode="decimal" step={step} min="0" value={quantity} onChange={handleChange} />
      <p>{productAtual.unit}</p>
      <input type="button" value="adicionar" disabled={disableButton} onClick={addItem} />
    </div>
  );
}

const validation = (productId, quantity, productAtual) => quantity !== undefined && quantity !== "" && productId !== undefined && productId === productAtual.id && ((productAtual.unit === 'cx' && quantity % 1 === 0) || (productAtual.unit === 'und' && quantity % 1 === 0) || (productAtual.unit === 'kg'))

export default NewOrderItem;