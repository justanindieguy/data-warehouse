import React, { useState, useEffect, useRef } from 'react';
import { Field } from 'react-final-form';
import useOutsideClickListener from '../../hooks/useOutsideClickListener';
import './styles.scss';

const AutocompleteInput = (props) => {
  const { name, placeholder, onDebouncedTermChange, renderResults } = props;
  const [menuOpened, setMenuOpened] = useState(false);
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownBox = useRef(null);

  useOutsideClickListener(dropdownBox, () => setMenuOpened(false));

  const toggleMenuOpen = () => {
    if (!results.length) {
      setMenuOpened(false);
      return;
    }

    setMenuOpened(!menuOpened);
  };

  useEffect(() => {
    if (selectedItem && selectedItem.name === term) {
      return;
    }

    const timerId = setTimeout(() => setDebouncedTerm(term), 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [term, selectedItem]);

  useEffect(() => {
    const updateResults = async () => {
      const queryResults = await onDebouncedTermChange(debouncedTerm);
      setResults(queryResults);
    };

    updateResults();
  }, [debouncedTerm, onDebouncedTermChange]);

  useEffect(() => {
    results.length ? setMenuOpened(true) : setMenuOpened(false);
  }, [results]);

  useEffect(() => {
    setMenuOpened(false);

    if (selectedItem) {
      setTerm(selectedItem.name);
    }
  }, [selectedItem]);

  return (
    <div
      className={`dropdown ${menuOpened ? 'is-active' : ''}`}
      ref={dropdownBox}
    >
      <div className="dropdown-trigger">
        <div className="control has-icons-right">
          <input
            className="input"
            placeholder={placeholder}
            value={term}
            onChange={(evt) => setTerm(evt.target.value)}
            required
          />
          <Field
            name={name}
            defaultValue={selectedItem && term ? selectedItem.id : ''}
          >
            {({ input }) => <input {...input} type="text" hidden required />}
          </Field>
          <span
            className="icon is-small is-right is-clickable"
            onClick={toggleMenuOpen}
          >
            <i
              className={`fas ${menuOpened ? 'fa-angle-up' : 'fa-angle-down'}`}
            />
          </span>
        </div>
      </div>
      <div className="dropdown-menu">
        <div className="dropdown-content">
          {results && renderResults(results, setSelectedItem)}
        </div>
      </div>
    </div>
  );
};

export default AutocompleteInput;
