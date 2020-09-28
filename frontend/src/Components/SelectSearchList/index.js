import React, { useState, useEffect, useRef } from 'react';
import './style.scss';

function SelectSearchList({ list, onSelect, visible, listen, inputProperty }) {
  const [filteredList, setFilteredList] = useState(list);

  const divRef = useRef()

  useEffect(_ => {
    const handleClick = e => {
      if (divRef.current.contains(e.target)) {
        listen(true);
      } else {
        listen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    setFilteredList(list)
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [listen, list])

  return (
    <div ref={divRef}>
      <ul id="suggestions-select">
        {
          visible ? filteredList.map((element) => (
            <li key={element.id} onClick={_ => onSelect(element)}>{element[inputProperty]}</li>
          )) : null
        }
      </ul>
    </div>
  );
}

export default SelectSearchList;