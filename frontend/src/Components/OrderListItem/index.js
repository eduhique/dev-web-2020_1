import React, { useState, useEffect } from 'react';
import OrderListItemEdit from "../OrderListItemEdit"
import './style.scss'

function OrderListItem({ setMode, onSubmit, searchFunction, modifyItem, deleteItem, ...props }) {
  const [item, setItem] = useState({});
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [modeEdit, setModeEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const searchFunctionInter = userInput => {
    return searchFunction(userInput, item.product.id);
  }

  const editPropert = e => {
    setIsEdit(true);
    setMode(true);
  }
  const handleSubmit = e => {
    setIsEdit(false);
    onSubmit(e);
  }

  const cancelEdit = e => {
    setIsEdit(false);
    setMode(false);
  }

  useEffect(_ => {
    setItem(props.item);
    setName(props.item.product.name);
    setQuantity(props.item.quantity);
    setUnit(props.item.product.unit);
    setModeEdit(props.mode);
  }, [props.item, props.mode])

  return (
    <div>
      { modeEdit && isEdit ? <OrderListItemEdit
        item={props.item}
        modifyItem={modifyItem}
        searchProduct={searchFunctionInter}
        onSubmit={handleSubmit}
        deleteItem={deleteItem}
        cancelEdit={cancelEdit} /> :
        <div className="order-item" key={props.id}>
          <div className="order-name">
            <p>{name}</p>
          </div>
          <div className="order-quantity">
            <p>{quantity}</p>
          </div>
          <div className="order-unit">
            <p>{unit}</p>
          </div>
          <div className={"order-edit"}>
            <button disabled={modeEdit} onClick={editPropert}>Edit</button>
          </div>
        </div >
      }
    </div>
  );
}

export default OrderListItem;