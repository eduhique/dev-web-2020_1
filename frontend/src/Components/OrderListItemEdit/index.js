import React, { useState, useEffect } from 'react';
import SelectSearch from '../SelectSearch';
import './style.scss';

function OrderListItemEdit({ onSubmit, cancelEdit, modifyItem, searchProduct, deleteItem, ...props }) {
  const [productId, setProductId] = useState(props.item.productId);
  const [quantity, setQuantity] = useState(props.item.quantity | 0);
  const [productAtual, setProductAtual] = useState(props.item.product);
  const [button, setButton] = useState(props.item && props.item.id > 0 ? false : true);
  const [step, setStep] = useState("1");

  const handleSubmit = event => {
    if (validation(productId, quantity, productAtual)) {
      modifyItem({ productId, quantity: Number(quantity), product: productAtual });
    }
  }

  const onSelect = product => {
    setProductId(product.id);
    setProductAtual(product);
  }

  function handleChange(event) {
    const target = event.currentTarget;
    if (target.name === 'qtd') {
      const input = target.value;
      setQuantity(input);
    }
  }

  useEffect(() => {

    if (validation(productId, quantity, productAtual)) {
      setButton(false)
    } else {
      setButton(true)
    }
    if (productAtual.unit === "kg") {
      setStep("any")
    }

  }, [productId, quantity, productAtual])

  return (
    <div className="product-item">
      <div className="order-name">
        <SelectSearch onSelect={onSelect} placeholder="Insira um Produto" modelName="Produtos" inputProperty="name" searchFunction={searchProduct} selectedProps={productAtual.name} />
      </div>
      <div className="order-quantity">
        <input type="number" className="qtd" name="qtd" inputMode="decimal" step={step} min="0" value={quantity} onChange={handleChange} />
      </div>
      <div className="order-unit">
        <p>{productAtual.unit}</p>
      </div>
      <div className="product-edit">
        <input type="submit" disabled={button} value="S" onClick={handleSubmit} />
        <input type="button" value="C" onClick={cancelEdit} />
        <input type="button" onClick={(e) => { if (window.confirm(`Deseja realmente deletar o item ${productAtual.name}?`)) deleteItem(productId) }} value="D" />
      </div>
    </div>
  );
}

const validation = (productId, quantity, productAtual) => quantity !== undefined && quantity !== "" && productId !== undefined && productId === productAtual.id && ((productAtual.unit === 'cx' && quantity % 1 === 0) || (productAtual.unit === 'und' && quantity % 1 === 0) || (productAtual.unit === 'kg'))

export default OrderListItemEdit;