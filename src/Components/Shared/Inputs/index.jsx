import React from 'react';
import styles from './input.module.css';

export function Input({ labelText, type, name, placeholder, blur, register, disabled, error }) {
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {labelText}
      </label>
      <input
        className={type !== 'checkbox' ? styles.input : ''}
        type={type || 'text'}
        name={name}
        placeholder={placeholder || ''}
        onBlur={blur && blur}
        disabled={disabled}
        {...register(name)}
      />
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
}

export function Textarea({ labelText, rows, cols, name, placeholder, blur, register }) {
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {labelText}
      </label>
      <textarea
        className={styles.textarea}
        name={name}
        rows={rows}
        cols={cols}
        placeholder={placeholder || ''}
        onBlur={blur && blur}
        {...register(name)}
      ></textarea>
    </>
  );
}
