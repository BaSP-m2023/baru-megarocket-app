import React from 'react';
import styles from './input.module.css';

export function Input({ labelText, value, type, name, change, placeholder, blur }) {
  const checkedValue = type === 'checkbox' ? value || false : undefined;

  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {labelText}
      </label>
      <input
        className={type !== 'checkbox' ? styles.input : ''}
        type={type || 'text'}
        value={type !== 'checkbox' ? value : undefined}
        checked={checkedValue}
        name={name}
        placeholder={placeholder || ''}
        onBlur={blur && blur}
        onChange={change && change}
      />
    </>
  );
}

export function Textarea({ labelText, rows, cols, value, name, change, placeholder, blur }) {
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {labelText}
      </label>
      <textarea
        className={styles.textarea}
        value={value}
        name={name}
        rows={rows}
        cols={cols}
        onChange={change && change}
        placeholder={placeholder || ''}
        onBlur={blur && blur}
      ></textarea>
    </>
  );
}
