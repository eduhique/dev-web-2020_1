import React, { useState, useEffect, useRef } from 'react';
import Loading from '../../Components/Loading';
import SelectSearchList from '../SelectSearchList';
// import { Link } from 'react-router-dom';
import './style.scss';

function SelectSearch({ onSelect, placeholder, modelName, inputProperty, searchFunction, resetInput, selectedProps }) {
  const [filteredIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [inside, setInside] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startSelect, setStartSelect] = useState(true);

  let inputRef = useRef();

  function handleChange(event) {
    const input = event.target.value;
    setUserInput(input);
    setEnabled(true);
  }

  function onKeyPress(event) {
    if (event.key === 'Enter' && userInput && filteredList.length > 0) {
      const item = filteredList[filteredIndex];
      selectItem(item);
      inputRef.current.blur();
      setEnabled(false)
    }
  }

  function onBlur(event) {
    if (!inside) {
      setEnabled(false)
      if (!userInput || filteredList.length === 0) {
        onSelect({});
        setUserInput("");
      } else if (userInput && filteredList.length !== 0) {
        const item = filteredList[filteredIndex];
        selectItem(item)
      }
    }
  }

  function selectItem(item) {
    onSelect(item);
    setUserInput(item[inputProperty]);
    setStartSelect(true);
    setEnabled(false);
  }

  useEffect(_ => {
    setLoading(true)
    let isSubscribed = true;
    const search = async _ => {
      const l = await searchFunction(userInput);
      if (isSubscribed) {
        setFilteredList(l);
      }
    };
    search();
    if (resetInput) {
      setUserInput("");
    }
    setLoading(false)

    if (selectedProps !== undefined && selectedProps.trim() !== "" && startSelect) {
      setUserInput(selectedProps);
      setStartSelect(false);
    }

    return _ => isSubscribed = false
  }, [userInput, enabled, searchFunction, resetInput, selectedProps, startSelect])

  return (
    <div>
      {loading ? <Loading /> : <SelectSearchList list={filteredList} onSelect={selectItem} visible={enabled} listen={boolean => setInside(boolean)} inputProperty={inputProperty} />}
      <div>
        <input
          type="text"
          className={enabled ? "suggestions-input" : "select-input"}
          placeholder={placeholder}
          ref={inputRef}
          onChange={handleChange}
          onKeyPress={onKeyPress}
          onDoubleClick={_ => setEnabled(!enabled)}
          onBlur={onBlur}
          value={userInput}
          autoComplete='off'
        />
        <input className="button-select" type="button" value={modelName} onClick={_ => setEnabled(!enabled)} />
      </div>
    </div>
  );
}

export default SelectSearch;