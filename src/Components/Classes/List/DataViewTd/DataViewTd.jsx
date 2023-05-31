import React from 'react';
import { useState } from 'react';
import styles from './dataView.module.css';

const DataViewTD = ({
  editEnable,
  onChange,
  selectedClass,
  item,
  itemValidation,
  itemData,
  typeInput,
  options,
  typeOptions,
  className
}) => {
  const [inputValue, setInputValue] = useState(itemData);
  const [errorMessage, setErrorMessage] = useState('');
  const isEditing = editEnable && selectedClass && selectedClass._id === item._id;
  const isInputTypeSelect = typeInput === 'select';
  const isInputTypeSelectDay = typeInput === 'selectDay';

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setErrorMessage('');

    if (typeInput !== 'select' && typeInput !== 'selectDay' && value <= 0) {
      setErrorMessage('The value cannot be 0 or less.');
    }
    if (typeInput !== 'selectDay' && value === '') {
      setErrorMessage('The value is required');
    }

    onChange(e);
  };

  let inputElement;

  if (isEditing) {
    if (!isInputTypeSelect && !isInputTypeSelectDay) {
      inputElement = (
        <div className={styles.container}>
          <input
            className={className}
            type={typeInput}
            name={typeOptions}
            onChange={handleInputChange}
            value={inputValue}
          />
          {typeInput !== 'select' && typeInput !== 'selectDay' && errorMessage && (
            <span style={styles.span}>{errorMessage}</span>
          )}
        </div>
      );
    } else if (!isInputTypeSelectDay) {
      inputElement = (
        <div className={styles.container}>
          <select className={className} name={typeOptions} onChange={handleInputChange}>
            <option value="">Select</option>
            {options.map((option) => (
              <option
                key={option._id}
                value={option._id}
                selected={
                  typeOptions === 'activity'
                    ? itemData === option.name
                    : itemData === option.firstName
                }
              >
                {typeOptions === 'activity' ? option.name : option.firstName}
              </option>
            ))}
          </select>
          {typeInput !== 'selectDay' && errorMessage && (
            <span style={styles.span}>{errorMessage}</span>
          )}
        </div>
      );
    } else {
      inputElement = (
        <select className={className} name={typeOptions} onChange={onChange}>
          <option value={itemData}>{itemData}</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      );
    }
  }

  const displayValue = item && itemValidation !== null && itemValidation !== 0 ? itemData : 'Empty';

  return <td>{isEditing ? inputElement : displayValue}</td>;
};

export default DataViewTD;
