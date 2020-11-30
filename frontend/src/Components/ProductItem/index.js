import React, { useState, useEffect } from 'react';
import ProductEdit from "../ProductEdit"
import './style.scss'

function ProductItem({ setMode, setLoading, onSubmit, ...props }) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [modeEdit, setModeEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
    setName(props.name);
    setUnit(props.unit);
    setModeEdit(props.mode);
  }, [props.name, props.unit, props.mode])

  return (
    <div>
      { modeEdit && isEdit ? <ProductEdit
        id={props.id}
        name={props.name}
        unit={props.unit}
        onSubmit={handleSubmit}
        cancelEdit={cancelEdit} /> : <div className="product-item">
          <div className="product-name">
            <p>{name}</p>
          </div>
          <div className="product-other">
            <div className="type-algn">
              <p>{unit === "cx" ? "Caixa" : (unit === "kg" ? "Quilo" : "unidade")}</p>
            </div>
            <div className={"product-edit"}>
              <ul>
                <li><button disabled={modeEdit} onClick={editPropert}>Edit</button></li>
              </ul>
            </div>
          </div>
        </div >
      }
    </div>
  );
}

export default ProductItem;