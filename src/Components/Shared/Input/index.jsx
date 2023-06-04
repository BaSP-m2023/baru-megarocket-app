import React from 'react';
import styles from './input.module.css';

function Input({ labelText, value, type, name, change, placeholder, blur }) {
  const checkedValue = type === 'checkbox' ? value || false : undefined;

  return (
    <>
      <label className={styles.label}>{labelText}</label>
      <input
        className={type !== 'checkbox' ? styles.input : ''}
        type={type || 'text'}
        value={type !== 'checkbox' ? value : undefined}
        defaultChecked={checkedValue}
        name={name}
        placeholder={placeholder || ''}
        onBlur={blur && blur}
        onChange={change && change}
      />
    </>
  );
}

export default Input;
