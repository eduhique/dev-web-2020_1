import React, { useState, useEffect } from 'react';
import OrderListItem from '../OrderListItem';
import api from '../../services/Api';
import './style.scss';


function OrderList({ items, setItems }) {
  const [modeEdit, setModeEdit] = useState(false)

  const modifyItem = (item, index) => {
    items[index] = item;
    setModeEdit(false)
  }
  const deleteItem = productId => {
    let index = items.findIndex(obj => {
      if ((obj.productId !== undefined && !isNaN(obj.productId)) && (productId > 0) && obj.productId === productId) {
        return true;
      } else {
        return false;
      }
    })
    if (index > -1) items.splice(index, 1)
    setModeEdit(false)
  }

  async function searchProduct(userInput, itemModifyId) {
    let data = [];
    await api.get(`product/?s=${userInput}`).then(response => {
      data = response.data
    })
      .catch(response => data = []);
    return data.filter(obj => !items.find(item => itemModifyId !== item.productId && item.productId === obj.id));
  }

  useEffect(_ => {
  }, [setModeEdit, modeEdit])

  return (
    <div className="list-order">
      <div className="list-order-header">
        <h3>Produto</h3>
        <h3>Quantidade</h3>
        <h3>Unidade</h3>
        <h3>Ações</h3>
      </div>
      <div className="list-order-body">
        {
          items.length > 0 ? items.map((element, index) => (
            <OrderListItem
              key={index}
              item={element}
              searchFunction={searchProduct}
              modifyItem={item => modifyItem(item, index)}
              deleteItem={deleteItem}
              mode={modeEdit}
              onSubmit={e => { setModeEdit(false); }}
              setMode={setModeEdit} />
          )) : null
        }
      </div>
    </div>
  );
}

export default OrderList;